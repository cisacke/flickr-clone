class Photo < ActiveRecord::Base
  validates :title, presence: true

  has_many :photostream_photos, dependent: :destroy
  has_many :favorites_photos
  has_attached_file :image, default_url: "dummy-photo.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
