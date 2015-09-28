json.extract!(@user, :f_name, :l_name, :email, :id)
json.avatar json.image_url asset_path(@user.avatar.url(:original))
json.cover json.image_url asset_path(@user.cover.url(:original))
json.num_photos @user.photos.count
json.joined @user.created_at.year

json.albums do
  json.array!(@user.albums) do |album|
    json.extract! album, :id, :title, :description, :user_id, :image_url
  end
end
# json.favorite_id @user.favorite.id
json.is_followed(Following.where({follower_id: @current_user.id, followed_id: @user.id}).length == 1 ? true : false)
