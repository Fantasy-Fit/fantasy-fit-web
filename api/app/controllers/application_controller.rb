class ApplicationController < ActionController::API
    include ActionController::Cookies
    include JsonWebToken

    before_action :authenticate_request

    private

    def authenticate_request
        header = request.headers["Authorization"]
        header = header.split(" ").last if header
        decoded = jwt_decode(header)
        current_user = User.find(decoded[:user_id])
    end

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    private

    def record_not_found(error)
        render json: { error: "#{error.model} not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :render_unprocessable_entity
    end

end
