class AlbumPhoto < ActiveRecord::Base
  validates :photo, :album, presence: true

  belongs_to :photo
  belongs_to :album
end
