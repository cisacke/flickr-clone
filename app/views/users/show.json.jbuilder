json.extract!(@user, :f_name, :l_name, :email, :id)
json.avatar json.image_url asset_path(@user.avatar.url(:original))
json.cover json.image_url asset_path(@user.cover.url(:original))
json.num_photos @user.photos.count
json.joined @user.created_at.year

json.photostream do
  json.extract!(@user.photostream, :id, :user_id)
end
json.photostream_photos do
  json.array!(@user.photostream.photos
          .includes(:user)
          .select("photos.*, COUNT(comments.id) AS num_comments, COUNT(favorites_photos.id) AS num_faves")
          .joins("LEFT OUTER JOIN comments ON comments.photo_id = photos.id")
          .joins("LEFT OUTER JOIN favorites_photos ON favorites_photos.photo_id = photos.id")
          .group("photos.id")
          .order(created_at: :desc)) do |photo|
    json.extract! photo, :id, :title, :description, :user_id
    json.extract! photo.user, :f_name, :l_name
    json.image_url asset_path(photo.image.url(:original))
    json.num_faves photo.num_faves
    json.num_comments photo.num_comments
  end
end
json.albums do
  json.array!(@user.albums) do |album|
    json.extract! album, :id, :title, :description, :user_id, :image_url
  end
end
json.favorite_id @user.favorite.id
json.is_followed(Following.where({follower_id: @current_user.id, followed_id: @user.id}).length == 1 ? true : false)
