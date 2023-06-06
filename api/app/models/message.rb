class Message < ApplicationRecord
    after_create_commit { broadcast_message }
    belongs_to :user

    validates :body, presence: :true

    private

    def broadcast_message
        ActionCable.server.broadcast("MessagesChannel", {
                                                            id: self.id,
                                                            body: self.body,
                                                            user: self.user
                                                        })
    end
end
