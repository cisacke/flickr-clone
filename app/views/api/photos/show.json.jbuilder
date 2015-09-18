json.extract!(@photo, :id, :title, :description)
json.image_url asset_path(@photo.image.url(:original))
json.comments do
  json.array!(@photo.comments) do |comment|
    json.extract! comment, :id, :author_id, :photo_id, :body
  end
end
