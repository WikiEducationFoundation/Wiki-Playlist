class PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :edit, :update, :destroy, :preview, :render_share_image, :render_status]

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.user_id = current_user.id
    respond_to do |format|
      if @playlist.save
        GenerateShareImage.enqueue(@playlist.id, :title => @playlist.title)
        format.json { render json: {
          id: @playlist.id,
          articles: @playlist.articles
        } }
      else
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET /playlists/1
  # GET /playlists/1.json
  def show
  end

  # PATCH/PUT /playlists/1
  # PATCH/PUT /playlists/1.json
  def update
    @playlist.share_image_rendered = false;
    respond_to do |format|
      if @playlist.update(playlist_params)
        GenerateShareImage.enqueue(@playlist.id, :title => @playlist.title)
        format.json { render json: {
          id: @playlist.id,
          articles: @playlist.articles
        } }
      else
        # format.html { render :edit }
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /playlists/1
  # DELETE /playlists/1.json
  def destroy
    @playlist.destroy
    respond_to do |format|
      # format.html { redirect_to playlists_url, notice: 'Playlist was successfully destroyed.' }
      format.json { head :no_content, message: 'Playlist was successfully deleted.' }
    end
  end

  def preview
    render :json => { :preview => render_to_string('show', :layout => false) }
  end


  def render_share_image
    playlist = render_to_string('show', layout: false)
    binding.pry
    title = @playlist.title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
    render_job = `phantomjs --ignore-ssl-errors=yes --ssl-protocol=TLSv1 --debug=true lib/script/share-image.js "#{playlist}" '#{title}'`
    respond_to do |format|
      format.json { render json: { message: JSON.parse(render_job) } }
    end
  end

  def render_status
    status = { rendered: false }
    if @playlist.share_image_rendered
      status = {
        rendered: true,
        url: @playlist.share_image.url
      }
    end
    render json: status
  end
  
  private

    def set_playlist
      @playlist = Playlist.find(params[:id])
      @articles = @playlist.articles
    end

    def playlist_params
      params.require(:playlist).permit(
        :title, 
        :caption,
        :articles_attributes => [:id, :title, :url, :image, :description, :pageId, :_destroy]
      )
    end
end
