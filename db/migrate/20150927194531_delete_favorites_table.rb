class DeleteFavoritesTable < ActiveRecord::Migration
  def change
    drop_table :favorites
    rename_column(:favorites_photos, :favorite_id, :user_id)
  end
end
