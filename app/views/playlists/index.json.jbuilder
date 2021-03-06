# json.array! @playlists, :id, :title, :caption
json.data do
  json.user @user
  json.total_playlists @total_playlists
  json.playlists @playlists do |playlist|
    json.id playlist.id
    json.url "#{request.base_url}/playlist/#{playlist.slug}"
    json.featured playlist.featured
    json.title playlist.title
    json.color playlist.color
    json.user playlist.user
    json.articles playlist.articles do |article|
      json.id article.id
      json.title article.title
      json.description article.description
      json.url article.url
      json.image article.image
    end
  end
  json.featured_playlists @featured_playlists do |playlist|
    json.id playlist.id
    json.url "#{request.base_url}/playlist/#{playlist.slug}"
    json.featured playlist.featured
    json.title playlist.title
    json.color playlist.color
    json.user playlist.user
    json.articles playlist.articles do |article|
      json.id article.id
      json.title article.title
      json.description article.description
      json.url article.url
      json.image article.image
    end
  end
end