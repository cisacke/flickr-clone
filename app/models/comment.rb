class Comment < ActiveRecord::Base
  validates :author_id, :photo_id, presence: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

  belongs_to :photo
end
