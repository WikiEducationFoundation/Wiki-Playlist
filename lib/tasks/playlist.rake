namespace :playlist do
  task generate_featured_share_images: :environment do
    ac = ApplicationController.new
    Playlist.featured.each do |playlist|
      html = ac.render_to_string(
        :template => "/playlists/share_image",
        :formats => [:html],
        :layout => false,
        :locals => {
          :@playlist => playlist,
          :@articles => playlist.articles.order(:position),
          :@user => User.find(playlist.user_id)
        }
      )
      puts "#{playlist.title} #{html}"
      GenerateShareImage.enqueue(playlist.id, :html => html)
    end
  end

  task generate_share_images: :environment do
    ac = ApplicationController.new
    Playlist.needs_updated_image.each do |playlist|
      html = ac.render_to_string(
        :template => "/playlists/share_image",
        :formats => [:html],
        :layout => false,
        :locals => {
          :@playlist => playlist,
          :@articles => playlist.articles.order(:position),
          :@user => User.find(playlist.user_id)
        }
      )
      puts "#{playlist.title} #{html}"
      GenerateShareImage.enqueue(playlist.id, :html => html)
    end
  end

  task update_greens: :environment do
    Playlist.where(:color => '#00DE9A').each do |playlist|
      playlist.color = '#00D186'
      playlist.save
    end
  end
end
