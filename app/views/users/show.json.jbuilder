json.extract!(@user, :f_name, :l_name, :email, :id)
json.avatar json.image_url asset_path(@user.avatar.url(:original))
json.cover json.image_url asset_path(@user.cover.url(:original))

json.photostream do
  json.extract!(@user.photostream, :id, :user_id)
end
json.photostream_photos do
  json.array!(@user.photostream.photos.order(created_at: :desc)) do |photo|
    json.extract! photo, :id, :title, :description
    json.image_url asset_path(photo.image.url(:original))
  end
end
json.albums do
  json.array!(@user.albums) do |album|
    json.extract! album, :id, :title, :description, :user_id, :image_url
  end
end
json.favorite do
  json.extract!(@user.favorite, :id, :user_id)
end
json.favorite_photos do
  json.array!(@user.favorite.photos) do |photo|
    json.extract! photo, :id, :title, :description
    json.image_url asset_path(photo.image.url(:original))
  end
end
