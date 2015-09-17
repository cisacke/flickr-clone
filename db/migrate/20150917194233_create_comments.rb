class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :photo_id, null: false
      t.integer :author_id, null: false
      t.string :body, null: false

      t.timestamps null: false
    end

    add_index :comments, :photo_id
    add_index :comments, :author_id
  end
end
