# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 
    "http://localhost:4000",
    "https://fantasyfit.netlify.app", 
    "https://main--fantasyfit.netlify.app",
    /https:\/\/deploy-preview-\d{1,3}--fantasyfit\.netlify\.app/

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      max_age: 1728000
  end
end
