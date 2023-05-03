class Post < ApplicationRecord
  belongs_to :competition
  belongs_to :user
  has_many :likes
  has_many :liking_users, through: :likes, source: :user
end
