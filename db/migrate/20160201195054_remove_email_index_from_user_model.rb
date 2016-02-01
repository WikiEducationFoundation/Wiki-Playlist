class RemoveEmailIndexFromUserModel < ActiveRecord::Migration
  def change
    remove_index :users, :email if index_exists?(:users, :email)
  end
end
