class AddColorToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :color, :string
  end
end
