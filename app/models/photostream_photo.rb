class PhotostreamPhoto < ActiveRecord::Base
  validates :photostream_id, :photo_id, presence: true

  belongs_to :photostream
  belongs_to :photo
end
