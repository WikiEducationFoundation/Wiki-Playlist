class PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :edit, :update, :destroy, :preview]

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.user_id = current_user.id
    params['articles'].each do |article| 
      @playlist.articles.build(article_params(article))
      # remove me demo for errors:  @playlist.articles.build(article)
    end
    
    respond_to do |format|
      if @playlist.save
        @articles = @playlist.articles
        format.json { render :show, status: :created, location: @playlist }
      else
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET /playlists/1
  # GET /playlists/1.json
  def show
  end

  def preview
    render :json => { :preview => render_to_string('show', :layout => false) }
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

  private

    def set_playlist
      @playlist = Playlist.find(params[:id])
      @articles = @playlist.articles
    end

    def playlist_params
      params.require(:playlist).permit(
        :title, 
        :caption, 
        :featured, 
        :share_image_rendered, 
        :share_image,
        articles_attributes: [:title, :url, :image, :description, :pageId]
      )
    end

    def article_params(article)
      { 
        :title => article[:title], 
        :url => article[:url],
        :image => article[:image]['url'],
        :description => article[:description],
        :pageId => article[:pageId]
      }
    end
end
