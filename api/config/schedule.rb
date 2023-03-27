every 1.day, at: "4:30 am" do
    rake "blacklisted_tokens:cleanup_expired_tokens"
  end
  