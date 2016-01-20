require 'spec_helper'
require 'rails_helper'

describe PlaylistsController do
  login_user
  render_views

  before(:each) do
    @playlist_attributes = {
          title: 'My Playlist',
          caption: 'My Caption',
          featured: false,
          share_image_rendered: false,
          share_image: '',
          articles_attributes: [
            attributes_for(:article, title: "Article 1"),
            attributes_for(:article, title: "Article 2"),
            attributes_for(:article, title: "Article 3"),
          ]
      }
    xhr :post, :create, {playlist: @playlist_attributes} , format: :json
    @data = JSON.parse(response.body)
    @playlist = Playlist.find(@data['id'])
    @playlist_json = @playlist.to_json(:include => :articles)
  end
  
  describe "#create" do
    it 'creates a new playlist and its associated articles' do
      expect(@data).not_to be_empty
      expect(@data).to have_key('id')
      expect(@data['id']).to be_a(Integer)
      expect(@playlist.articles.length).to eq(3)
    end
  end

  describe "#update" do
    it 'updates the playlist without duplicating its associated articles' do
      # binding.pry
      # playlist = @playlist.to_json(:include => :articles)
      xhr :put, :update, {id:@playlist.id, playlist: @playlist_json}, format: :json
      data = JSON.parse(response.body)
      expect(data).not_to be_empty
      expect(@playlist.articles.length).to eq(3)
    end
  end

end