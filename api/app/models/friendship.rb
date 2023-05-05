class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: "User"

  validate :not_self
  validate :not_duplicate
  before_destroy :check_active_competition

  private

  def not_self
    errors.add(:friend, "Can't be equal to yourself") if user == friend
  end

  # def not_duplicate
  #   errors.add(:friend, "Already added") if user.friends.include?(friend)
  # end

  def not_duplicate
    if status == "pending" || status == "requested"
      errors.add(:friend, "Already added") if user.friends.include?(friend)
    else
      errors.add(:friend, "Already added") if Friendship.exists?(user: user, friend: friend, status: "accepted")
    end
  end

  def check_active_competition
    if Competition.joins(participants: { user: :friendships })
         .where('friendships.friend_id = ? AND users.id = ? AND competitions.public = ?', friend.id, user.id, false)
         .exists?
      errors.add(:base, 'Cannot remove friend because they are participating in an active private competition')
      puts "Cannot remove friend because..."
      throw :abort
    end
  end

end