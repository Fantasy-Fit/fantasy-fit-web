class CompetitionsController < ApplicationController
    def leaderboard
        competition = Competition.find(params[:id])
        players = competition.users
        workouts = competition.workouts
        
        playerPoints = {}
        players.map do |player|
            playerPoints[player.username] = {points: 0, user: player.username}
        end
        
        workouts.each do |workout| 
            user = workout.user.username
            playerPoints[user][:points] += workout.points
        end

        result = playerPoints.values.sort_by{|h| -h[:points]}.each_with_index do |hash, index|
            hash[:rank] = index + 1
        end

        render json: result
    end
end
