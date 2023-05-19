class PostsController < ApplicationController

    before_action :authenticate_request, only: [:create, :destroy]

    def index
        competition = Competition.find(params[:competition_id])
        render json: competition.posts, status: :ok
    end

    def create
        user = @current_user
        competition = Competition.find(params[:competition_id])
        post = Post.create!(user_id: user.id, competition_id: competition.id, description: params[:description])
        ActionCable.server.broadcast 'NotificationsChannel', "New Post in #{competition.name} competition by #{user.username}: #{post.description} "
        render json: post, status: :created
    end

    def destroy
        user = @current_user
        post = user.posts.find(params[:id])
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:description, :user_id, :competition_id)
    end
end
