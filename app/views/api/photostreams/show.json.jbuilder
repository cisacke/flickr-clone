json.photos do
  json.array!(@photos_in_photostream.includes(:user, :comments)
          .select("photos.*, COUNT(favorites_photos.id) AS num_faves")
          .joins("LEFT OUTER JOIN favorites_photos ON favorites_photos.photo_id = photos.id")
          .group("photos.id")
          .order(created_at: :desc)) do |photo|
    json.extract! photo, :id, :title, :description, :user_id
    json.extract! photo.user, :f_name, :l_name
    json.image_url asset_path(photo.image.url(:original))
    json.num_faves photo.num_faves
    json.num_comments photo.comments.to_a.length
  end
end
