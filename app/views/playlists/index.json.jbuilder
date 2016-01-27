# json.array! @playlists, :id, :title, :caption
json.playlists @playlists do |playlist|
  json.url "#{request.base_url}/#{playlist.id}"
  json.title playlist.title
  json.articles playlist.articles do |article|
    json.title article.title
    json.description article.description
    json.url article.url
    json.image article.image
  end
end