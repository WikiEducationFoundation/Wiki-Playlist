require 'rails_helper'

RSpec.describe Playlist, type: :model do
  describe 'Create' do
    it 'creates associated articles' do
      playlist = {
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
      playlist = Playlist.create(playlist)
      expect(playlist.articles.first.title).to eq('Article 1')
      expect(playlist.articles.second.title).to eq('Article 2')
      expect(playlist.articles.third.title).to eq('Article 3')
    end
  end
end
