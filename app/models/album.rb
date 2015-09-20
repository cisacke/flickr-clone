class Album < ActiveRecord::Base
  validates :user_id, :title, presence: true

  belongs_to :user
  has_many :photos, through: :album_photos, source: :photo
  has_many :album_photos, dependent: :destroy

end
