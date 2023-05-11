every 1.day, at: "4:30 am" do
    rake "tokens:cleanup_expired_tokens"
  end
  