class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :avatar, :gender, :year_of_birth, :location

  def attributes(*args)
    super.except!(:password_digest, :created_at, :updated_at)
  end
  
end
