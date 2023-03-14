# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
print "Seeding Users..."

User.create(username: "chrisli", email: "chris@mail.com", gender: "M", year_of_birth: "1991", location: "New York", password: "11111")
User.create(username: "coco", email: "colleen@mail.com", gender: "F", year_of_birth: "1991", location: "New York", password: "11111")
User.create(username: "dulatK", email: "dulat@mail.com", gender: "M", year_of_birth: "1992", location: "New York", password: "11111")
User.create(username: "alexisT", email: "alexis@mail.com", gender: "M", year_of_birth: "1999", location: "New York", password: "11111")

print "Seeding Competitions..."

Competition.create(name: "thisFitisLitt", identifier: "ABCDE12345", public: 1)

print "Seeding Participants..."

Participant.create(user_id: 1, competition_id: 1)
Participant.create(user_id: 2, competition_id: 1)
Participant.create(user_id: 3, competition_id: 1)
Participant.create(user_id: 4, competition_id: 1)

print "Seeing workouts..."

Workout.create(activity: "cycle", duration: 60, intensity: "M", date: "3/08/2023", calories: 789, avg_HR: 149, user_id: 1, competition_id: 1)
Workout.create(activity: "weights", duration: 60, intensity: "H", date: "3/08/2023", calories: 600, avg_HR: 140, user_id: 2, competition_id: 1)
Workout.create(activity: "soccer", duration: 75, intensity: "H", date: "3/07/2023", calories: 750, avg_HR: 140, user_id: 3, competition_id: 1)
Workout.create(activity: "weights", duration: 60, intensity: "M", date: "3/08/2023", calories: 800, avg_HR: 145, user_id: 4, competition_id: 1)

print "Complete!"