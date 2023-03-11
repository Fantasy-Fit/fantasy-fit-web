class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password, :avatar, :gender, :year_of_birth, :location
end
