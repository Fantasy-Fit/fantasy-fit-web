every 1.day, at: "4:30 am" do
    rake "tokens:cleanup_expired_tokens"
  end

# every 1.minute do
#     rake "tokens:cleanup_expired_tokens"
# end
  