class CreatePhotostreams < ActiveRecord::Migration
  def change
    create_table :photostreams do |t|
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :photostreams, :user_id
  end
end
