class AddImagesToUser < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :cover
    end
  end

  def self.down
    remove_attachment :users, :cover
  end

  def self.up
    change_table :users do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :users, :avatar
  end
end
