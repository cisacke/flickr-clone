class Photostream < ActiveRecord::Base
  validates :user_id, presence: true

  has_many :photostream_photos, dependent: :destroy
  has_many :photos, through: :photostream_photos, source: :photo
  belongs_to :user
end
