class CompetitionSerializer < ActiveModel::Serializer
  attributes :id, :name, :identifier, :public
  has_many :users, through: :participants
end
