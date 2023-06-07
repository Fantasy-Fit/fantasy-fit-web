Sidekiq::Cron::Job.create(
    name: 'Clean up expired tokens daily',
    cron: '0 3 * * *', # Run at 3:00AM UTC daily
    # cron: '*/1 * * * *', # Run every 1 minute
    class: 'CleanupExpiredJwtJob'
)