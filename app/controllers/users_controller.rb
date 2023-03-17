class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:index, :create]
    before_action :set_user, only: [:show, :destroy]

    def index
        render json: User.all, status: :ok
    end

    

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end


    private 

    def user_params
        params.permit(:username, :email, :password, :avatar, :gender, :year_of_birth, :location)
    end

    def set_user
        user = User.find(params[:id])
    end
end
