require 'sidekiq/web'

Rails.application.routes.draw do

  #action cable server
  mount ActionCable.server => "/cable"
  mount Sidekiq::Web => '/sidekiq'

  resources :messages
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
  post "/auth/autologin", to: "authentication#autologin"
  get "/auth/refresh", to: "authentication#refresh"
  post "/logout", to: "authentication#logout"
  post "/competition/join", to: "competitions#join"
  get "/competition/leaderboard/:id", to: "competitions#leaderboard"
  get "/search_competitions", to: "competitions#search"
  delete "/like", to: "likes#destroy"
  get "/friends", to: "friendships#index"
  post "/searchfriends", to: "friendships#search"
  post "/friends", to: "friendships#create"
  patch "/accept_friend/:friendship_id", to: "friendships#update"
  delete "/delete_friend/:friendship_id", to: "friendships#destroy"

end
