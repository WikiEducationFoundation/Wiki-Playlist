namespace :articles do
  desc "TODO"
  task update_fallbacks: :environment do
    articles = Article.where("image like ?", "%wikipedia-page-fallback.png%")
    articles.update_all(:image => 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Lightbulb_mark.svg', :commons_url => 'https://meta.wikimedia.org/wiki/File:Lightbulb_mark.svg')
    puts "#{articles.count()} updated!"
  end
end
