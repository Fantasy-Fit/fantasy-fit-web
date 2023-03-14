class User < ApplicationRecord
    has_secure_password
    has_many :participants
    has_many :competitions, through: :participants

    has_many :workouts
    has_many :posts

end
