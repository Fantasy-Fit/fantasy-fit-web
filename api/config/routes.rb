Rails.application.routes.draw do
  resources :likes, only: [:create, :destroy]
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
  delete "/like", to: "likes#destroy"
  get "/friends", to: "friendships#index"
  post "/friends", to: "friendships#create"
  
  options '*path', to: 'application#cors_preflight_check'
end
