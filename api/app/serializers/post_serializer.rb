class PostSerializer < ActiveModel::Serializer
  attributes :id
  has_one :competition
  has_one :user
end
