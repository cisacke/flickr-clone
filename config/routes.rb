Rails.application.routes.draw do
  root to: "static_pages#root"
  get '/users/current_user', to: 'users#current_user'
  get '/auth/facebook/callback', to: 'oauth_callbacks#facebook'

  post 'user/follow', to: "users#new_follow"
  delete 'user/follow', to: "users#delete_follow"

  resources :users
  resource :session

  namespace :api, defaults: {format: :json} do
    post 'photos/favorite', to: "photos#new_favorite"
    delete 'photos/favorite', to: "photos#delete_favorite"

    post 'photos/photostream', to: "photos#new_photostream"
    delete 'photos/photostream', to: "photos#delete_photostream"

    resources :albums
    resources :photos
    resources :photostreams
    resources :favorites, only: :show
    resources :photostream_photos, only: [:create, :destroy]
    resources :favorite_photos, only: [:create, :destroy, :show]
    resources :album_photos, only: [:create, :destroy]
    resources :comments
  end
end
