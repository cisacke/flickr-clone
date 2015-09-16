class FavoritesPhoto < ActiveRecord::Base
  validates :favorite_id, :photo_id, presence: true

  belongs_to :photo
  belongs_to :favorite
end
