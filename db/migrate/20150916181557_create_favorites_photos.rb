class CreateFavoritesPhotos < ActiveRecord::Migration
  def change
    create_table :favorites_photos do |t|
      t.integer :favorite_id, null: false
      t.integer :photo_id, null: false

      t.timestamps null: false
    end

    add_index :favorites_photos, :favorite_id
    add_index :favorites_photos, :photo_id
  end
end
