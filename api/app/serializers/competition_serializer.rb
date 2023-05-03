class CompetitionSerializer < ActiveModel::Serializer
  attributes :id, :name, :identifier, :public, :icon, :created_at, :start_date, :end_date
  has_many :users, through: :participants
end
