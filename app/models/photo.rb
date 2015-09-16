class Photo < ActiveRecord::Base
  validates :title, presence: true

  has_many :photostream_photos
  has_many :favorites_photos
end
