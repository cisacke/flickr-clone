json.extract!(@user, :f_name, :l_name, :email, :id)
json.photostream do
  json.extract!(@user.photostream, :id, :user_id)
end
json.photostream_photos do
  json.array!(@user.photostream.photos) do |photo|
    json.extract! photo, :id, :title, :description, :image
  end
end
json.albums do
  json.array!(@user.albums) do |album|
    json.extract! album, :id, :title, :description, :user_id
  end
end
json.favorite do
  json.extract!(@user.favorite, :id, :user_id)
end
json.favorite_photos do
  json.array!(@user.favorite.photos) do |photo|
    json.extract! photo, :id, :title, :description, :image
  end
end
