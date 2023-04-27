class FriendshipsController < ApplicationController

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
