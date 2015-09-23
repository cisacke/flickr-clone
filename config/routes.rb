Rails.application.routes.draw do
  root to: "static_pages#root"
  get '/users/current_user', to: 'users#current_user'
  resources :users
  resource :session

  namespace :api, defaults: {format: :json} do
    post 'photos/favorite', to: "photos#new_favorite"
    delete 'photos/favorite', to: "photos#delete_favorite"
    resources :albums
    resources :photos
    resources :photostreams
    resources :photostream_photos, only: [:create, :destroy]
    resources :favorite_photos, only: [:create, :destroy, :show]
    resources :album_photos, only: [:create, :destroy]
    resources :comments
  end
end
