class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :activity, :duration, :intensity, :date, :avg_HR, :calories, :points, :claps
  has_one :user
  has_one :competition
end
