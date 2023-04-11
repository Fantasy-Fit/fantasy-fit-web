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
        params.require(:workout).permit(:activity, :duration, :intensity, :date, :avg_HR, :calories, :claps, :points, :user_id, :competition_id)
    end

    def calculate_points(params)
        intensity_points = { 
            "Low"=> 1.0, 
            "Medium"=> 1.5, 
            "High"=> 2.0 
        }
        activity_points = {
            "Run" => 8,
            "Cycle" => 7,
            "Indoor Cycle" => 6.6,
            "Mountain Biking" => 6.5,
            "Swimming" => 6.5,
            "Open Water Swimming" => 6.5,
            "Walking"=> 3,
            "Strength Training"=> 6.5, 
            "Cardio"=> 7, 
            "HIIT"=> 9.5,
            "Hiking" => 5,
            "Skiing" => 6,
            "Snowboarding" => 6,
            "Ice Skating" => 5.5,
            "Treadmill" => 7.5,
            "Track Run" => 7,
            "Rowing" => 6,
            "Canoe" => 5,
            "Kayak" => 5,
            "Sailing" => 4,
            "Skateboarding" => 4, 
            "Surfing" => 5.5,
            "Indoor Row" => 6,
            "Standup Paddle Boarding" => 3,
            "Yoga" => 5,
            "Pilates" => 5,
            "Dance" => 6,
            "Tai Chi" => 3,
            "Core Training" => 4,
            "Floor Climb" => 6,
            "Elliptical" => 5.5,
            "Indoor Climbing" => 6,
            "Chess" => 2.5,
            "Tennis" => 6, 
            "Squash" => 6.5,
            "Basketball" => 7,
            "Soccer" => 7,
            "American Football" => 7,
            "Golf" => 4,
            "Crossfit" => 9.5,
        }
        points = intensity_points[params[:intensity]] * activity_points[params[:activity]].to_f * params[:duration].to_f
        points.to_i
    end

    def update_leaderboard(comp_id)
        competition = Competition.find(comp_id)
        participants = competition.participants.sort_by {|p| -p.user_total_points}
    end

end
