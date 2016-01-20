# t.integer  "user_id"
# t.boolean  "featured",             default: false
# t.boolean  "share_image_rendered", default: false
# t.string   "share_image"

FactoryGirl.define do
  factory :playlist do
    title 'My Playlist'
    caption 'My Caption'
    featured false
    share_image_rendered false
    share_image ''
    factory :playlist_with_articles do
      after(:create) do |playlist|
        3.times do |i| 
          create(:article, playlist: playlist, title: "Article #{i + 1}")
        end
      end
    end
  end
end
