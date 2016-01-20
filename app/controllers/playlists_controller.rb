class PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :edit, :update, :destroy, :preview, :render_share_image]

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.user_id = current_user.id
    respond_to do |format|
      if @playlist.save
        # format.json { render :show, status: :created, location: @playlist }
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
    respond_to do |format|
      if @playlist.update(playlist_params)
        format.json { render :show, status: :ok, location: @playlist }
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
    render_job = `phantomjs --ignore-ssl-errors=yes --ssl-protocol=TLSv1 --debug=true lib/script/share-image.js '#{playlist}'`
    respond_to do |format|
      format.json { render json: { message: render_job } }
    end
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
