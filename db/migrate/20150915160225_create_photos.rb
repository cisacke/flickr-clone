class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :album_id, null: false
      t.string :title, null: false
      t.string :description
      t.string :image

      t.timestamps null: false
    end

    add_index :photos, :album_id
  end
end
