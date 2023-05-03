class User < ApplicationRecord
    has_secure_password
    has_many :participants
    has_many :competitions, through: :participants

    has_many :workouts
    has_many :posts

    has_many :likes
    has_many :liked_posts, through: :likes, source: :post

    has_many :friendships, dependent: :destroy
    has_many :friends, through: :friendships

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true
    # validates :password, presence: true

    def add_friend(friend)
        friendship = friendships.create(friend: friend, status: "pending")
    end

    def remove_friend(friend)
        friendship = friendships.find_by(friend: friend)
        friendship.destroy if friendship
    end

    def accept_friendship(friendship)
        friendship.update(status: "accepted")
    end
    
    def decline_friendship(friendship)
        friendship.destroy
    end

end
