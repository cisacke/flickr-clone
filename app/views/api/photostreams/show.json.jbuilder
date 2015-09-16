json.extract!(@photostream, :user_id)
json.photos do
  json.array!(@photostream.photos) do |photo|
    json.extract! photo, :id, :title, :description, :image
  end
end
