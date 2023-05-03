class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :competition_id, :description, :created_at
  has_one :competition
  has_one :user
  has_many :likes
  has_many :liking_users, through: :likes, source: :user
end
