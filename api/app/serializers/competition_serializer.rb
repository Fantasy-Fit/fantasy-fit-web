class CompetitionSerializer < ActiveModel::Serializer
  attributes :id, :name, :identifier, :public, :icon, :created_at
  has_many :users, through: :participants
end
