class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :competition_id, :description
  has_one :competition
  has_one :user
end
