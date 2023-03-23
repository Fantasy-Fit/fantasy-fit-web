module ActivityPoints
    extend ActiveSupport::Concern

    def get_activity_points activity
        "Run" => 8,
        "Cycle" => 7,
        "Indoor Cycle" => 6.6,
        "Mountain Biking" => 6.5
        "Swimming" => 6.5,
        "Open Water Swimming" => 6.5,
        "Walking"=> 3,
        "Strength Training"=> 6.5, 
        "Cardio"=> 7, 
        "HIIT"=> 10,
        "Hiking" => 5,
        "Skiing" => 6,
        "Snowboarding" => 6
        "Ice Skating" => 5.5
        "Treadmill" => 7.5,
        "Track Run" => 7
        "Rowing" => 6
        "Canoe" => 5
        "Kayak" => 5
        "Sailing" => 4
        "Skateboarding" => 
        "Surfing" =>
        "Indoor Row" =>
        "Standup Paddle Boarding" =>
        "Yoga" =>
        "Pilates" =>
        "Dance" =>
        "Tai Chi" =>
        "Core Training" =>
        "Floor Climb" =>
        "Elliptical" => 
        "Indoor Climbing" =>
        "Chess" =>
        "Tennis" =>
        "Squash" =>
        "Basketball" =>
        "Soccer" =>
        "American Football" =>
        "Golf" =>
        "Crossfit" =>
    end
end