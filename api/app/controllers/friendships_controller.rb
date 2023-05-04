class FriendshipsController < ApplicationController
    before_action :authenticate_request

    def index
        user = @current_user
        if params[:search]
            find_users = User.where("lower(username) LIKE ? AND user_type = ?", "%#{params[:search].downcase}%", "player")
            render json: find_users
        else
            render json: user.friendships
        end
    end

    def create
        user = @current_user
        friend = User.find_by(username: params[:friend_username])
    
        if user.add_friend(friend) && friend.add_friend(user)
          redirect_to root_path, notice: "Friend request sent."
        else
          redirect_to root_path, alert: "Failed to send friend request."
        end
    end
    
    def destroy
        user = @current_user
        friend = User.find_by(username: params[:friend_username])
        if user.remove_friend(friend) && friend.remove_friend(user)
          redirect_to root_path, notice: "Friend removed."
        else
          redirect_to root_path, alert: "Failed to remove friend."
        end
    end
end

