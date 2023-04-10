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
        params[:participants].map {|id| 
            Participant.create(
                competition_id: competition.id, 
                user_id: id,
                username: User.find(id).username,
                user_total_points: 0  
            )}
        render json: competition, status: :created
    end

    private

    def comp_params
        params.permit(:name, :public, :participants)
    end

    def generate_identifier
        loop do 
          identifier = SecureRandom.hex(4)
          puts "Trying identifier: #{identifier}"
          return identifier unless Competition.exists?(identifier: identifier)
        end
    end      
end
