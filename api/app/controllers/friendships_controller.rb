class FriendshipsController < ApplicationController
    before_action :authenticate_request

    def index
        user = @current_user
        render json: user.friendships
    end

    def create
        friend = User.find_by(username: params[:friend_username])
        current_user.add_friend(friend)
        redirect_to root_path, notice: "Friend request sent."
    end

    def destroy
        friend = User.find_by(username: params[:friend_username])
        current_user.remove_friend(friend)
        redirect_to root_path, notice: "Friend removed."
    end
end
