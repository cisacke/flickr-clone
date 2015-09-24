json.extract!(@favorite, :id, :user_id)
json.photos do
  json.array!(@favorite.photos) do |photo|
    json.extract! photo, :id, :title, :description, :x_pixels, :y_pixels
    json.image_url asset_path(photo.image.url(:original))
  end
end
