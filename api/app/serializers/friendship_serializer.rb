class FriendshipSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :friend_id, :status, :created_at, :friend_username, :friend_avatar

    def friend_username
        object.friend.username
    end

    def friend_avatar
        object.friend.avatar
    end
    
end