namespace :tokens do
    desc 'Clean up expired BlacklistedTokens'
    task cleanup_expired_tokens: :environment do
      puts "in line 4 of blacklisted_token.rake"
      BlacklistedToken.delete_expired_tokens
    end
  end
  