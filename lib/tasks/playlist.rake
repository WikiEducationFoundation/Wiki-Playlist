namespace :playlist do
  desc "TODO"
  task generate_featured_share_images: :environment do
    include Rails.application.routes.url_helpers
    ac = ApplicationController.new
    Playlist.featured.each do |playlist|
      html = ac.render_to_string(
        :template => '/playlists/share_image',
        :formats => [:html],
        :layout => false,
        :locals => {
          :@playlist => playlist,
          :@articles => playlist.articles.order(:position),
          :@user => User.find(playlist.user_id)
        }
      )
      GenerateShareImage.enqueue(playlist.id, :html => html)
    end
  end

end
