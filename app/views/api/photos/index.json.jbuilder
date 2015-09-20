json.array!(@photos) do |photo|
  json.extract! photo, :id, :title, :description, :user_id
  json.image_url asset_path(photo.image.url(:original))
end
