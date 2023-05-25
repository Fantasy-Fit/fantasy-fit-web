class AuthenticationController < ApplicationController
    include JsonWebToken

    def login 
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
            token = jwt_encode(user_id: user.id)
            refresh = jwt_refresh(user_id: user.id)
            render json: {
                token: token, 
                refresh: refresh,
                user: UserSerializer.new(user),
                workouts: user.workouts,
                competitions: user.competitions,    
            },  status: :ok
        else
            render json: {error: "unauthorized"}, status: :unauthorized
        end
    end

    def logout
        token = params[:token]
        refresh = params[:refresh]

        begin
            decoded = jwt_decode(token)
            if decoded.is_a?(Hash)
                BlacklistedToken.create!(token: token, user_id: decoded[:user_id], expires_at: Time.current)
                BlacklistedToken.create!(token: refresh, user_id: decoded[:user_id], expires_at: Time.current)
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
            refresh = jwt_refresh(user_id: user.id)
            render json: {
                token: token, 
                user: user, 
                refresh: refresh
            }, status: :created
        else
            render json: {error: "invalid"}, status: :unprocessable_entity
        end
    end

    def autologin
        if authenticate_request == nil 
            render json: {
                "success": "auto login successful"
            }
        end

        puts "on line 62", authenticate_request
    end

    private 

    def user_params
        params.permit(:username, :email, :password, :location, :gender, :avatar)
    end
end
