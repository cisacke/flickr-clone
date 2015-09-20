class AddCoverImageToAlbum < ActiveRecord::Migration
  def self.up
    change_table :albums do |t|
      t.attachment :cover_image
    end
  end

  def self.down
    remove_attachment :albums, :cover_image
  end
end
