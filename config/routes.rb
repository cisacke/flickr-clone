Rails.application.routes.draw do
  root to: "static_pages#root"

  get '/users/current_user', to: 'users#current_user'
  resources :users
  resource :session

  namespace :api, defaults: {format: :json} do
    resources :albums
    resources :photos
    resource :photostream
  end
end
