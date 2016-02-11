namespace :articles do
  desc "TODO"
  task update_fallbacks: :environment do
    articles = Article.where("image like ?", "%Lightbulb_mark.svg%")
    articles.update_all(:image => 'https://w-playlist.s3.amazonaws.com/images/Lightbulb_mark.svg', :commons_url => 'https://meta.wikimedia.org/wiki/File:Lightbulb_mark.svg')
  end
end
