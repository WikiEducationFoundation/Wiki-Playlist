class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.belongs_to :user, index: true
      t.boolean :featured, default: false
      t.boolean :share_image_rendered, default: false
      t.string :share_image
      t.timestamps null: false
    end
  end
end
