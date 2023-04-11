puts "Seeding Users..."

User.create(username: "chrisli", email: "chris@mail.com", gender: "M", year_of_birth: "1991", location: "New York", password: "11111")
User.create(username: "coco", email: "colleen@mail.com", gender: "F", year_of_birth: "1991", location: "New York", password: "11111")
User.create(username: "dulatK", email: "dulat@mail.com", gender: "M", year_of_birth: "1992", location: "New York", password: "11111")
User.create(username: "alexisT", email: "alexis@mail.com", gender: "M", year_of_birth: "1999", location: "New York", password: "11111")

puts "Seeding Competitions..."

Competition.create(name: "thisFitisLitt", identifier: "ABCDE12345", public: 1)
Competition.create(name: "Friends Race", identifier: "ABCDE12341", public: 1)

puts "Seeding Participants..."

Participant.create(user_id: 1, competition_id: 1, username: "chrisli", user_total_points: 180)
Participant.create(user_id: 2, competition_id: 1, username: "coco", user_total_points: 405)
Participant.create(user_id: 3, competition_id: 1, username: "dulatK", user_total_points: 1200)
Participant.create(user_id: 4, competition_id: 1, username: "alexisT", user_total_points: 450)

Participant.create(user_id: 1, competition_id: 2, username: "chrisli", user_total_points: 0)
Participant.create(user_id: 2, competition_id: 2, username: "coco", user_total_points: 0)
Participant.create(user_id: 3, competition_id: 2, username: "dulatK", user_total_points: 0)
Participant.create(user_id: 4, competition_id: 2, username: "alexisT", user_total_points: 0)

puts "Seeing workouts..."

Workout.create(activity: "Walking", duration: 60, intensity: "M", date: "3/08/2023", calories: 789, avg_HR: 149, user_id: 1, competition_id: 1, points: 180)
Workout.create(activity: "Strength Training", duration: 60, intensity: "H", date: "3/08/2023", calories: 600, avg_HR: 140, user_id: 2, competition_id: 1, points: 405)
Workout.create(activity: "Cardio", duration: 75, intensity: "H", date: "3/07/2023", calories: 750, avg_HR: 140, user_id: 3, competition_id: 1, points: 1200)
Workout.create(activity: "HIIT", duration: 60, intensity: "M", date: "3/08/2023", calories: 800, avg_HR: 145, user_id: 4, competition_id: 1, points: 450)

puts "Complete!"