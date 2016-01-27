class GenerateShareImage < Que::Job
  # Default settings for this job. These are optional - without them, jobs
  # will default to priority 100 and run immediately.
  include Rails.application.routes.url_helpers

  @priority = 10
  @run_at = proc { 1.second.from_now }

  def run(playlist_id, options)
    @playlist = Playlist.find(playlist_id)
    
    playlist_html = options[:html]
    title = @playlist.title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
    render_job = `phantomjs --ignore-ssl-errors=yes --ssl-protocol=TLSv1 --debug=true lib/script/share-image.js '#{playlist_html}' '#{title}'`
    image_info = JSON.parse(render_job)
    rendered = image_info['rendered']
    path = image_info['path']
    return unless rendered
    @attachment = File.open path

    ActiveRecord::Base.transaction do
      @playlist.update_attributes :share_image_rendered => true, 
                                  :share_image => @attachment
      File.delete(path)
      destroy
    end
    
  end
end