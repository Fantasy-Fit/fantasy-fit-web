class UsersController < ApplicationController

    def index
        render json: User.all, status: :ok
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        user = set_user
        user.update(user_params)
        if user
            render json: {user: user}, status: :accepted
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
