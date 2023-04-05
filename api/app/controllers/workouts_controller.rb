class WorkoutsController < ApplicationController
    
    def index
        workouts = Workout.where(user: @current_user)
        render json: workouts
    end

    def create
        
        workout_points = calculate_points(workout_params)
        workout = Workout.create!(workout_params.merge(:points => workout_points))
        participant = Participant.where(user_id: params[:user_id], competition_id: params[:competition_id])
        total_points = participant[0].user_total_points == nil ? 0 : participant[0].user_total_points + workout_points
        participant.update!(user_total_points: total_points)
        leaderboard = update_leaderboard(params[:competition_id])
        render json: {
            workout: workout,
            leaderboard: leaderboard,
        }, status: :created
    end

    private

    def workout_params
        params.permit(:activity, :duration, :intensity, :date, :avg_HR, :calories, :claps, :points, :user_id, :competition_id)
    end

    def calculate_points(params)
        intensity_points = { "Low"=> 1.0, "Medium"=> 1.5, "High"=> 2.0 }
        activity_points = {
            "Walking"=> 3,
            "Strength Training"=> 6, 
            "Cardio"=> 7, 
            "HIIT"=> 10
        }
        points = intensity_points[params[:intensity]] * activity_points[params[:activity]].to_f * params[:duration].to_f
        points.to_i
    end

    def update_leaderboard(comp_id)
        competition = Competition.find(comp_id)
        participants = competition.participants.sort_by {|p| -p.user_total_points}
    end

end
