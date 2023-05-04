class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :avatar, :gender, :year_of_birth, :location
  has_many :friends
  has_many :inverse_friends

  def inverse_friends
    object.inverse_friends
  end
end
