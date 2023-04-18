class CompetitionsController < ApplicationController

    def leaderboard
        competition = Competition.find(params[:id])
        participants = competition.participants.sort_by {|p| -p.user_total_points}
        render json: participants
    end

    def index
        user = User.find(params[:user_id])
        render json: user.competitions, status: :ok
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

    def join
        competition = Competition.find(params[:id]) || Competition.find_by(identifier: params[:identifier])
        user = User.find_by(username: params[:username])

        if competition.nil?
            render json: { error: "Competition not found"}, status: :not_found
            return
        elsif user.nil?
            render json: { error: "User not found"}, status: :not_found
            return
        elsif competition.participants.where(user_id: user.id).exists?
            render json: { error: "User is already a participant in this competition"}, status: :unprocessable_entity
            return
        end

        participant = competition.participants.create(
            user_id: user.id,
            username: user.username,
            user_total_points: 0
        )

        render json: participant, status: :created

    end

    private

    def comp_params
        params.permit(:name, :public, :participants, :icon)
    end

    def generate_identifier
        loop do 
          identifier = SecureRandom.hex(4)
          puts "Trying identifier: #{identifier}"
          return identifier unless Competition.exists?(identifier: identifier)
        end
    end      
end
