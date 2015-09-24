class AddAspectRatioToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :x_pixels, :integer
    add_column :photos, :y_pixels, :integer
  end
end
