json.extract!(@photo, :id, :title, :description)
json.extract!(@photo.user, :f_name, :l_name)
json.author_id(@photo.user, :id)
json.is_favorite (FavoritesPhoto.where({photo_id: @photo.id, user_id: @current_user.id})).length == 1 ? true : false
json.image_url asset_path(@photo.image.url(:original))
json.author_avatar asset_path(@photo.user.avatar.url(:original))
json.comments do
  json.array!(@photo.comments) do |comment|
    json.extract! comment, :id, :author_id, :photo_id, :body
    json.extract!(comment.author, :f_name)
    json.extract!(comment.author, :l_name)
    json.author_avatar asset_path(comment.author.avatar.url(:original))
  end
end
