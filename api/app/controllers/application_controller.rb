class ApplicationController < ActionController::API
    include ActionController::Cookies
    include JsonWebToken
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity


    before_action :authenticate_request

    private

    def authenticate_request
        header = request.headers["Authorization"]
        header = header.split(" ").last if header
        decoded = jwt_decode(header)
        @current_user = User.find(decoded[:user_id])
        @current_user_token = @current_user.user_token.find_by(token: header)
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: "Unauthorized" }, status: unauthorized
    end



    def record_not_found(error)
        render json: { error: "#{error.model} not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :render_unprocessable_entity
    end

end
