class LikesController < ApplicationController
    before_action :authenticate_request
    
    def create
        user = @current_user
        like = Like.create!(user_id: user.id, post_id: params[:post_id])
        render json: like, status: :created
    end

    def destroy
        user = @current_user
        like = Like.find_by(user_id: user.id, post_id: params[:post_id])
        if like
            like.destroy
            head :no_content
        else
            render json: {error: "unable to delete like"}, status: :unprocessable_entity
        end
    end
end
