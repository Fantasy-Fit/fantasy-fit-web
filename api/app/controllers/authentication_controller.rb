class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request
    include JsonWebToken
    before_action :cors_set_access_control_headers

    def login 
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
            token = jwt_encode(user_id: user.id)
            render json: {token: token, user: user}, status: :ok
        else
            render json: {error: "unauthorized"}, status: :unauthorized
        end
    end

    def logout
        token = request.headers["Authorization"]
        token = token.split(" ").last if token.present?
        begin
            decoded = jwt_decode(token)
            if decoded.is_a?(Hash)
                BlacklistedToken.create!(token: token, user_id: decoded[:user_id], expires_at: Time.current)
                render json: { message: "Logged out successfully"}, status: :ok
            else
                render json: {error: "Invalid token"}, status: :unprocessable_entity
            end
        rescue JWT::DecodeError, ActiveRecord::RecordNotFound
            render json: {error: "Invalid token"}, status: :unprocessable_entity
        end
    end
    

    def signup
        user = User.create!(user_params)
        if user
            token = jwt_encode(user_id: user.id)
            render json: {token: token, user: user}, status: :created
        else
            render json: {error: "invalid"}, status: :unprocessable_entity
        end
    end


    def cors_preflight_check
        if request.method == 'OPTIONS'
          cors_set_access_control_headers
          render text: '', content_type: 'text/plain'
        end
      end
      
    protected
      
    def cors_set_access_control_headers
        response.headers['Access-Control-Allow-Origin'] = check_origin
        response.headers['Access-Control-Allow-Credentials'] = "true"
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, Auth-Token, Email, X-User-Token, X-User-Email'
        response.headers['Access-Control-Max-Age'] = '1728000'
    end

    private 

    def user_params
        params.permit(:username, :email, :password)
    end

    def check_origin
        permitted_origins = Set[
            "http://localhost:4000", 
            "http://127.0.0.1:4000"
        ]

        origin = request.origin

        if permitted_origins.include?(origin)
            origin
        else
            render json: { error: "Origin not permitted" }
        end
    end
end
