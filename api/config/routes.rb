Rails.application.routes.draw do
  resources :posts
  resources :participants
  resources :comments
  resources :workouts
  # resources :competitions, only: [:show]
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/auth/login", to: "authentication#login"
  get "/competition/leaderboard/:id", to: "competitions#leaderboard"
  
end
