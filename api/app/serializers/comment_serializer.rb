class CommentSerializer < ActiveModel::Serializer
  attributes :id
  has_one :workout
  has_one :user
end
