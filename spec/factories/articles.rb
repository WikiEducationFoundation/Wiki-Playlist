# t.integer  "playlist_id"
# t.integer  "pageId"
# t.string   "title"
# t.string   "description"
# t.string   "image"

FactoryGirl.define do
  factory :article do
    pageId 123
    title 'Zebra Fish'
    url 'http://wikipedia.org'
    description 'Lorem ipsum Nostrud aliqua Duis non minim labore ea ut officia in velit mollit ad magna amet culpa occaecat commodo cillum sit dolore amet mollit dolor nisi nostrud et.'
    image 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Zebrafisch.jpg/600px-Zebrafisch.jpg'
  end
end
