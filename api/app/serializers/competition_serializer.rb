class CompetitionSerializer < ActiveModel::Serializer
  attributes :id, :name, :identifier, :public, :icon
  has_many :users, through: :participants
end
