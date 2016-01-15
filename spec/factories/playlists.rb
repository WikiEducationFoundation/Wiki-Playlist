# t.integer  "user_id"
# t.boolean  "featured",             default: false
# t.boolean  "share_image_rendered", default: false
# t.string   "share_image"

FactoryGirl.define do

  factory :article do
    pageId 123
    title 'Zebra Fish'
    description 'Lorem ipsum Nostrud aliqua Duis non minim labore ea ut officia in velit mollit ad magna amet culpa occaecat commodo cillum sit dolore amet mollit dolor nisi nostrud et.'
    image 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Zebrafisch.jpg/600px-Zebrafisch.jpg'
  end

  factory :playlist, class: Playlist do
    title 'Zebras'
    featured false
    share_image_rendered false
    after(:create) {|playlist| playlist.articles = [create(:article), create(:article)]}
  end
end
