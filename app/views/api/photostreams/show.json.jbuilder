json.extract!(@photostream, :title, :user_id)
json.photos do
  json.array!(@photostream.photos) do |photo|
    json.extract! photo, :title, :description, :album_id, :image
  end
end
