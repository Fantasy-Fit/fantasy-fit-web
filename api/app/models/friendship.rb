class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: "User"

  validate :not_self
  validate :not_duplicate

  private

  def not_self
    errors.add(:friend, "Can't be equal to yourself") if user == friend
  end

  def not_duplicate
    errors.add(:friend, "Already added") if user.friends.include?(friend)
  end
end
