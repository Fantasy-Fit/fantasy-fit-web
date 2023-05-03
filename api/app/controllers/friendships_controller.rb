class FriendshipsController < ApplicationController
    before_action :authenticate_request

    def index
        user = @current_user
        if params[:search]
            find_users = User.where("lower(username) LIKE ? AND user_type = ?", "%#{params[:search].downcase}%", "player")
            puts find_users
            render json: find_users
        else
            render json: user.friendships
        end
        
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
