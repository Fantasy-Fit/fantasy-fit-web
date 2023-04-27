class UsersController < ApplicationController
    before_action :authenticate_request, only: [:update]

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        user = @current_user
        user.update(user_params)
        if user
            render json: user, status: :accepted
        else
            render json: {error: "unable to update profile"}, status: :unprocessable_entity
        end
    end

    private 

    def user_params
        params.require(:user).permit(:username, :email, :password, :avatar, :gender, :year_of_birth, :location)
    end

    def set_user
        user = User.find(params[:id])
    end
end
