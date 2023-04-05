Rails.application.routes.draw do
  resources :posts
  resources :participants
  resources :comments
  resources :workouts, only: [:index, :show]
  resources :competitions, only: [:index, :show, :create]
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/auth/login", to: "authentication#login"
  post "/auth/signup", to: "authentication#signup"
  delete "/logout", to: "authentication#logout"
  
  get "/competition/leaderboard/:id", to: "competitions#leaderboard"

  # match '/auth/login', controller: 'application', action: 'cors_preflight_check', via: [:options]
  # match '/auth/signup', controller: 'application', action: 'cors_preflight_check', via: [:options]
  # match '/logout', controller: 'application', action: 'cors_preflight_check', via: [:options]
  # match '/users', controller: 'application', action: 'cors_preflight_check', via: [:options]

  match '/auth/login' || '/auth/signup' || '/logout' || '/users', controller: 'application', action: 'cors_preflight_check', via: [:options]
  
end
