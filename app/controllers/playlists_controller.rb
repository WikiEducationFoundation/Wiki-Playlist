class PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :edit, :update, :feature, :destroy, :share_image, :get_share_html, :render_share_image, :render_status, :render_success]

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.user_id = current_user.id
    respond_to do |format|
      if @playlist.save
        GenerateShareImage.enqueue(@playlist.id, :html => get_share_image_html(@playlist))
        format.json { render json: {
          id: @playlist.id,
          articles: @playlist.articles
        } }
      else
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
  end

  def index
    if current_user && User.find(current_user.id).admin
      @playlists = Playlist.all
    else
      @playlists = Playlist.featured
    end

    respond_to do |format|
      format.json do
        format.json { render json: { playlists: @playlists } }
      end
    end
  end

  def share_image
  end

  # PATCH/PUT /playlists/1
  # PATCH/PUT /playlists/1.json
  def update
    @playlist.share_image_rendered = false;
    respond_to do |format|
      if @playlist.update(playlist_params)
        GenerateShareImage.enqueue(@playlist.id, :html => get_share_image_html(@playlist))
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
    status = { ready: false }
    if @playlist.share_image_rendered
      status = {
        ready: true,
        share_image_url: @playlist.share_image.url
      }
    end
    render json: status
  end

  def render_success
    render :js => "$(document).trigger($.Event('ShareImageRenderComplete', #{@playlist.id}));"
  end

  def get_share_html
    render :json => { :preview => get_share_image_html(@playlist) }
  end

  def get_share_image_html(playlist)
    render_to_string(
      :template => '/playlists/share_image',
      :formats => [:html],
      :layout => false,
      :locals => {
        :@playlist => playlist,
        :@articles => playlist.articles.order(:position),
        :@user => User.find(playlist.user_id)
      }
    )
  end
  
  private

    def set_playlist
      if Playlist.where(id: params[:id]).blank?
        redirect_to '/404'
      else
        @playlist = Playlist.find(params[:id])
        @articles = @playlist.articles.order(:position)
        @user = User.find(@playlist.user_id)
      end
      
    end

    def playlist_params
      params.require(:playlist).permit(
        :title, 
        :caption,
        :articles_attributes => [:id, :title, :url, :image, :description, :pageId, :_destroy, :position]
      )
    end
end
