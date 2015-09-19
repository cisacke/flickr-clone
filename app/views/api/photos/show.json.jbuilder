json.extract!(@photo, :id, :title, :description)
json.extract!(@photo.user, :f_name, :l_name)
json.image_url asset_path(@photo.image.url(:original))
json.comments do
  json.array!(@photo.comments) do |comment|
    json.extract! comment, :id, :author_id, :photo_id, :body
    json.extract!(comment.author, :f_name)
    json.extract!(comment.author, :l_name)
  end
end
