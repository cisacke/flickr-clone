class FixPhotosTable < ActiveRecord::Migration
  def change
    remove_column :photos, :album_id
  end
end
