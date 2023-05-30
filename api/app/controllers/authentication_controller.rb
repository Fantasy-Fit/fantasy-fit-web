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
        # try to authenticate with token
        header = request.headers["Authorization"]
        header = header.split(" ").last if header
        if header[0...6] == "token="
            header = header[6...]
        end

        refresh = params[:refresh]

        begin
            decoded = jwt_decode(header)
            @current_user = User.find(decoded[:user_id])
            blacklisted_token = BlacklistedToken.find_by(token: header, user_id: decoded[:user_id])
            if blacklisted_token 
                render json: { error: "Invalid Token" }, status: :unauthorized
            else
                render json: {
                    token: header,
                    refresh: refresh
                }
            end

        rescue JWT::DecodeError, ActiveRecord::RecordNotFound
            # refresh token is not valid because it has expired

            decoded = jwt_decode(refresh)
            @current_user = User.find(decoded[:user_id])
            blacklisted_token = BlacklistedToken.find_by(token: refresh, user_id: decoded[:user_id])
            if blacklisted_token
                render json: {error: "Invalid Refresh Token"}, status: :unauthorized
            end

            # refresh token is valid, has not expired, and has not been blacklisted: generate new tokens
            new_token = jwt_encode(user_id: @current_user.id)
            new_refresh = jwt_refresh(user_id: @current_user.id)
            render json: {
                token: new_token, 
                refresh: new_refresh,
            },  status: :ok
            
        end

    end

    private 

    def user_params
        params.permit(:username, :email, :password, :location, :gender, :avatar)
    end
end
