class ChangePlaylistShareImageColumnToAttachment < ActiveRecord::Migration
  def change
    change_column :playlists, :share_image, :string
    add_attachment :playlists, :share_image
  end
end
