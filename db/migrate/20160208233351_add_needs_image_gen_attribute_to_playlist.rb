class AddNeedsImageGenAttributeToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :needs_image_regeneration, :boolean, default: false
  end
end
