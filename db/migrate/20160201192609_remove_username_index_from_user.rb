class RemoveUsernameIndexFromUser < ActiveRecord::Migration
  def change
    remove_index :users, :username if index_exists?(:users, :username)
  end
end
