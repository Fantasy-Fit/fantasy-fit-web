class FriendshipsController < ApplicationController
    def create
        friend = User.find_by(username: params[:friend_username])
    
        if current_user.add_friend(friend) && friend.add_friend(current_user)
          redirect_to root_path, notice: "Friend request sent."
        else
          redirect_to root_path, alert: "Failed to send friend request."
        end
    end
    
    def destroy
        friend = User.find_by(username: params[:friend_username])
    
        if current_user.remove_friend(friend) && friend.remove_friend(current_user)
          redirect_to root_path, notice: "Friend removed."
        else
          redirect_to root_path, alert: "Failed to remove friend."
        end
    end
end
# def create
#     friend = User.find_by(username: params[:friend_username])
#     current_user.add_friend(friend)
#     redirect_to root_path, notice: "Friend request sent."
# end

# def destroy
#     friend = User.find_by(username: params[:friend_username])
#     current_user.remove_friend(friend)
#     redirect_to root_path, notice: "Friend removed."
# end
