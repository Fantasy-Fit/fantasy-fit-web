class FriendshipsController < ApplicationController
    before_action :authenticate_request

    def index
        user = @current_user
        render json: user.friendships
    end

    def search
      user = @current_user
      if params[:query]
          find_users = User.where("lower(username) LIKE ? AND user_type = ?", "%#{params[:query].downcase}%", "player")
          if find_users
            find_users.map{|user| puts user}
            render json: find_users
          else
            render json: {error: "no users found"}, status: :not_found
          end
      else
          render json: {error: "no search query"}, status: :unprocessable_entity
      end
    end

    def create
        user = @current_user
        friend = User.find(params[:friend_id])
        friendship = user.add_friend(friend)
        
        if friendship
          render json: {created_friendship: friendship}
        else
          redirect_to root_path, alert: "Failed to send friend request."
        end
    end
    
    def destroy
        puts "In Friendships#destroy, params[:id]", params[:friendship_id]
        user = @current_user
        friend = Friendship.find(params[:friendship_id]).friend
        user.remove_friend(friend) && friend.remove_friend(user)
        render json: {"message": "deleted!"}
    end

    def update
        puts "In Friendship#update", params[:friendship_id] 
        user = @current_user
        accepted_friendship = user.accept_friendship(params[:friendship_id])
        render json: {data: accepted_friendship}, status: :accepted
    end
end

