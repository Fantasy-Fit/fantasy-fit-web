class BlacklistedToken < ApplicationRecord
    belongs_to :user

    def self.delete_expired_tokens
        self.where("expires_at < ?", Time.current).delete_all
    end
end