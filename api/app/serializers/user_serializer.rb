class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :avatar, :gender, :year_of_birth, :location

end
