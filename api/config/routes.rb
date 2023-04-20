Rails.application.routes.draw do
  resources :posts
  resources :participants
  resources :comments
  resources :workouts, only: [:index, :show, :create]
  resources :competitions, only: [:index, :show, :create]
  resources :users, only: [:index]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/auth/login", to: "authentication#login"
  post "/auth/signup", to: "authentication#signup"
  patch "/auth/update_profile", to: "users#update"
  delete "/logout", to: "authentication#logout"
  post "/competition/join", to: "competitions#join"
  get "competition/join/:identifier", to: "competitions#show" 
  get "/competition/leaderboard/:id", to: "competitions#leaderboard"

  match '/workouts', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/auth/login', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/auth/signup', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/auth/update_profile', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/logout', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/users', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/competition/leaderboard/:id', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/competitions', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/competition/join', controller: 'application', action: 'cors_preflight_check', via: [:options]

  match '/competition/join/:identifier', controller: 'application', action: 'cors_preflight_check', via: [:options]

 
  match '/posts', controller: 'application', action: 'cors_preflight_check', via: [:options]

  # match '/auth/login' || '/auth/signup' || '/logout' || '/users', controller: 'application', action: 'cors_preflight_check', via: [:options]
  

end
