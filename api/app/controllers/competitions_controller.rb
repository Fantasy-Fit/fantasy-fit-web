class CompetitionsController < ApplicationController
    def leaderboard
        competition = Competition.find(params[:id])
        participants = competition.participants.sort_by {|p| -p.user_total_points}
        render json: participants
    end

    def index
        render json: Competition.all, status: :ok
    end

    def create
        competition = Competition.new(comp_params)
        competition.identifier = generate_identifier
        competition.save!
        render json: competition, status: :created
    end

    private

    def comp_params
        params.permit(:name, :public)
    end

    def generate_identifier
        loop do 
          identifier = SecureRandom.hex(4)
          puts "Trying identifier: #{identifier}"
          return identifier unless Competition.exists?(identifier: identifier)
        end
    end      
end
