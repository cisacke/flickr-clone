class RemoveAlbumIdValidationFromAlbumPhotos < ActiveRecord::Migration
  def change
    remove_column :album_photos, :album_id
    add_column :album_photos, :album_id, :integer
  end
end
