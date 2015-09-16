class AddAttachmentImageToPhotos < ActiveRecord::Migration
  def change
    remove_column :photos, :image
  end

  def self.up
    change_table :posts do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :photos, :image
  end
end
