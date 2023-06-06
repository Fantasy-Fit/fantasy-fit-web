class BlacklistedToken < ApplicationRecord
    belongs_to :user

    def self.delete_expired_tokens
        puts "running deleted_expired_tokens"
        # self.where("expires_at < ?", Time.current).delete_all
        self.first.destroy
        
    end
end