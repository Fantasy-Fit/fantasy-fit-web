namespace :tokens do
    desc 'Clean up expired BlacklistedTokens'
    task cleanup_expired_tokens: :environment do
      BlacklistedToken.delete_expired_tokens
    end
  end
  