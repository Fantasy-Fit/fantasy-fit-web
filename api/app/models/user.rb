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
    has_many :inverse_friendships, class_name: "Friendship", foreign_key: "friend_id"
    has_many :inverse_friends, through: :inverse_friendships, source: :user

    has_many :messages

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true
    # validates :password, presence: true

    def add_friend(friend)
        friendship = friendships.create!(friend: friend, status: "pending")
        inverse_friendship = friend.friendships.create(friend: self, status: "requested")
        friendship
    end

    def remove_friend(friend)
        friendship = friendships.find_by(friend: friend)
        inverse_friendship = friend.friendships.find_by(friend: self)
        friendship.destroy if friendship
        inverse_friendship.destroy if inverse_friendship
    end

    def accept_friendship(friendship_id)
        friendship = Friendship.find_by(id: friendship_id)
        
        if friendship
            Friendship.transaction do
                friendship.update(status: "accepted")

                inverse_friendship = Friendship.where(user: friendship.friend, friend: self)

                inverse_friendship.update(status: "accepted") if inverse_friendship

                friendship
            end
        else
            puts "Friendship not found"
        end
    end  
    
    def decline_friendship(friendship_id)
        friendship = Friendship.find_by(id: friendship_id)
        if friendship
            friendship.destroy
            inverse_friendship = friendship.friend.inverse_friendships.find_by(user: self)
            inverse_friendship.destroy if inverse_friendship
        else
            puts "Friendship not found"
        end
    end

end
