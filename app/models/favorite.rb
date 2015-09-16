class Favorite < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user
  has_many :favorites_photos, dependent: :destroy
  has_many :photos, through: :favorites_photos, source: :photo
end
