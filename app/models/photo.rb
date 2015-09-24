class Photo < ActiveRecord::Base
  validates :title, :user_id, presence: true

  has_many :photostream_photos, dependent: :destroy
  has_many :favorites_photos, dependent: :destroy
  has_many :favorites, through: :favorites_photos, source: :favorite
  has_many :comments, dependent: :destroy
  has_many :albums, through: :album_photos, source: :album
  has_many :album_photos, dependent: :destroy, inverse_of: :photo
  belongs_to :user

  has_attached_file :image, default_url: "dummy-photo.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
