class Workout < ApplicationRecord
  belongs_to :user
  belongs_to :competition

  validates :activity, presence: true
  validates :duration, numericality: { only_integer: true, greater_than: 0, message: "must be an integer greater than 0"}
  validates :intensity, presence: true
  validates :date, presence: true
end
