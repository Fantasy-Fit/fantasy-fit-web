Rails.application.routes.draw do
  resources :posts
  resources :participants
  resources :comments
  resources :workouts
  resources :competitions
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "auth/login", to: "authentication#login"
  
end
