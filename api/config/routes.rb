Rails.application.routes.draw do
  resources :posts
  resources :participants
  resources :comments
  resources :workouts, only: [:index, :show]
  resources :competitions
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/auth/login", to: "authentication#login"
  post "/auth/signup", to: "authentication#signup"
  delete "/logout", to: "authentication#logout"
  
  get "/competition/leaderboard/:id", to: "competitions#leaderboard"
  match '/auth/login', controller: 'authentication', action: 'cors_preflight_check', via: [:options]
  match '/auth/signup', controller: 'authentication', action: 'cors_preflight_check', via: [:options]
  match '/logout', controller: 'authentication', action: 'cors_preflight_check', via: [:options]
  match '/users', controller: 'authentication', action: 'cors_preflight_check', via: [:options]
  
end
