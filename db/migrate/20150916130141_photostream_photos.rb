class PhotostreamPhotos < ActiveRecord::Migration
  create_table :photostream_photos do |t|
    t.integer :photostream_id, null: false
    t.integer :photo_id, null: false
  end

  add_index :photostream_photos, :photostream_id
  add_index :photostream_photos, :photo_id
end
