class PostsController < ApplicationController

    def index
        competition = Competition.find(params[:competition_id])
        render json: competition.posts, status: :ok
    end

    def create
        user = User.find(params[:user_id])
        competition = Competition.find(params[:competition_id])
        post = Post.create!(post_params)
        render json: post, status: :created
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:description, :user_id, :competition_id)
    end
end
