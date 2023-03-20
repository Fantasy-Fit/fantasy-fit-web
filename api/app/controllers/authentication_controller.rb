class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request
    include JsonWebToken
    before_action :cors_set_access_control_headers

    def login 
        # byebug
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
            token = jwt_encode(user_id: user.id)
            render json: {token: token, user: user}, status: :ok
        else
            render json: {error: "unauthorized"}, status: :unauthorized
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
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4000'
        response.headers['Access-Control-Allow-Credentials'] = "true"
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, Auth-Token, Email, X-User-Token, X-User-Email'
        response.headers['Access-Control-Max-Age'] = '1728000'
    end
end
