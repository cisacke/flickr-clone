Rails.application.routes.draw do
  root to: "static_pages#root"

  get '/users/current_user', to: 'users#current_user'
  resources :users
  resource :session

  namespace :api, defaults: {format: :json} do
    resources :albums
    resources :photos
    resources :photostreams
    resources :photostream_photos, only: [:create, :destroy]
    resources :favorite_photos, only: [:create, :destroy]
    resources :album_photos, only: [:create, :destroy]
    resources :comments
  end
end
