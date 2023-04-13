class Competition < ApplicationRecord
    has_many :participants, dependent: :destroy
    has_many :users, through: :participants

    has_many :posts
    has_many :workouts
    has_many :comments
end
