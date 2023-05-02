class WorkoutsController < ApplicationController
    before_action :authenticate_request
    
    def index
        user = @current_user
        render json: user.workouts
    end

    def create
        user = @current_user
        workout_points = calculate_points(workout_params)
        workout = Workout.create!(workout_params.merge(:points => workout_points, :user_id => user.id))
        
        participant = Participant.where(user_id: user.id, competition_id: params[:competition_id])
        total_points = participant[0].user_total_points == nil ? 0 : participant[0].user_total_points + workout_points
        participant.update!(user_total_points: total_points)

        leaderboard = update_leaderboard(params[:competition_id])

        new_workout_post = Post.create(
            user_id: user.id,
            competition_id: params[:competition_id],
            description: "#{user.username} just posted a workout! #{params[:activity]} for #{params[:duration]} mins, earning #{workout_points} points!"
        )

        render json: {
            workout: workout,
            leaderboard: leaderboard,
            post: new_workout_post
        }, status: :created
    end

    def destroy
        user = @current_user
        workout = Workout.find(params[:id])
        participant = Participant.where(user_id: user.id, competition_id: workout.competition_id)
        total_points = participant[0].user_total_points - workout.points

        if (DateTime.now.to_i - workout.created_at.to_i)/(60*60*24) < 2
            workout.destroy
            participant.update!(user_total_points: total_points)
            leaderboard = update_leaderboard(competition_id: workout.competition_id)
            head :no_content
        else
            render json: {error: "You can not delete this workout"}, status: :unprocessable_entity
        end
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
