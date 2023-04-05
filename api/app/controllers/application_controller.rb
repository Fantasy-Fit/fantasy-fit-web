class ApplicationController < ActionController::API
    include ActionController::Cookies
    include JsonWebToken
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    @@current_user = nil

    before_action :cors_set_access_control_headers, :authenticate_request
    # skip_before_action :authenticate_request, only: [:cors_preflight_check]

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

    def authenticate_request
        header = request.headers["Authorization"]
        header = header.split(" ").last if header
        begin
            decoded = jwt_decode(header)
            @current_user = User.find(decoded[:user_id])
            blacklisted_token = BlacklistedToken.find_by(token: header, user_id: decoded[:user_id])
            if blacklisted_token && blacklisted_token.expires_at >= Time.current
                render json: { error: "Token has been blacklisted" }, status: :unauthorized
            end
        rescue JWT::DecodeError, ActiveRecord::RecordNotFound
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    end

    def record_not_found(error)
        render json: { error: "#{error.model} not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :render_unprocessable_entity
    end

    def check_origin
        permitted_origins = Set[
            "http://localhost:4000", 
            "http://127.0.0.1:4000",
            nil #for postman
        ]

        origin = request.origin

        if permitted_origins.include?(origin)
            origin
        else
            render json: { error: "Origin not permitted" }
        end
    end

end
