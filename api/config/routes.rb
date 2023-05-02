Rails.application.routes.draw do
  resources :posts
  resources :participants
  resources :comments
  resources :workouts, only: [:index, :create, :destroy]
  resources :competitions, only: [:index, :show, :create]
  resources :users, only: [:index] do
    member do
      post "accept_friend_request/:friend_id", to: "users#accept_friend_request"
      post "decline_friend_request/:friend_id", to: "users#decline_friend_request"
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/auth/login", to: "authentication#login"
  post "/auth/signup", to: "authentication#signup"
  patch "/auth/update_profile", to: "users#update"
  delete "/logout", to: "authentication#logout"
  post "/competition/join", to: "competitions#join"
  get "/competition/leaderboard/:id", to: "competitions#leaderboard"
  get "/search_competitions", to: "competitions#search"

  match '/workouts', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/workouts/:id', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/auth/login', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/auth/signup', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/auth/update_profile', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/logout', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/users', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/competition/leaderboard/:id', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/competitions', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/competition/join', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/posts', controller: 'application', action: 'cors_preflight_check', via: [:options]
  match '/posts/:id', controller: 'application', action: 'cors_preflight_check', via: [:options]


  match '/search_competitions', controller: 'application', action: 'cors_preflight_check', via: [:options]

  # match '/auth/login' || '/auth/signup' || '/logout' || '/users', controller: 'application', action: 'cors_preflight_check', via: [:options]

end
