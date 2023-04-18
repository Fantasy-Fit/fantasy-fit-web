class PostsController < ApplicationController

    def index
        competition = Competition.find(params[:competition_id])
        render json: competition.posts, status: :ok
    end

    private

    def post_params
        params.permit(:description, :user_id, :competition_id)
    end
end
