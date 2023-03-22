class Competition < ApplicationRecord
    has_many :participants
    has_many :users, through: :participants

    has_many :workouts
    has_many :comments
end
