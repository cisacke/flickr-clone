json.extract!(@photo, :id, :title, :description)
json.image_url asset_path(@photo.image.url(:original))
