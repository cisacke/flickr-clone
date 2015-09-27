class RemovePhotostream < ActiveRecord::Migration
  def change
    drop_table(:photostreams)
    rename_column(:photostream_photos, :photostream_id, :user_id)
  end
end
