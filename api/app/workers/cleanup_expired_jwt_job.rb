class CleanupExpiredJwtJob
  include Sidekiq::Worker

  def perform(*args)
    puts "Running cleanup_expired_jwt"
    BlacklistedToken.where("expires_at < ? ", Time.current).delete_all
    puts "Delete expired tokens"
  end
end
