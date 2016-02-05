const superagent = require('superagent');
let jsonp = require('superagent-jsonp');
import { getCSRFToken } from './rails';

/* Playlist Actions
--------------------------------------------- */

const allowed_playlist_attributes = ["title", "caption", "articles_attributes", "id", "featured", "color"];
const allowed_article_attributes = ["pageId", "title", "url", "description", "image", "id", "position"];

function filterArticleKeys(playlist) {
  let articles = playlist.articles.slice(0);
  articles = _.reject(articles, {url: ''});
  const server_ids = _.pluck(playlist.server_info.articles, 'id');

  articles.map((article, i) => {
    articles[i] = _.pick(article, allowed_article_attributes);
    articles[i].position = i;
    if(server_ids !== undefined) {
      articles[i].id = server_ids[i];
    }
    if(article.image.url !== '') {
      articles[i].image = article.image.url;
      articles[i].commons_url = article.image.commons_url;
    }
  });


  return articles;
}

function filterPlaylistKeys(playlist) {
  return _.pick(playlist, allowed_playlist_attributes);
}

function prepPlaylistAttributes(_playlist) {
  let playlist = _.assign({}, _playlist);
  playlist.articles_attributes = filterArticleKeys(_playlist);
  return {playlist: filterPlaylistKeys(playlist)};
}

export function createPlaylist(playlist, callback) {
  let _playlist = prepPlaylistAttributes(playlist);
  getCSRFToken((res)=> {
    superagent.post('/playlists')
    .set('X-CSRF-Token', res.token)
    .send(_playlist)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err || !res.ok) {
        callback({error: `${err.status} - ${err.response.statusText}`})
      } else {
        callback({error: null, res});
      }
    })
  });
}

export function updatePlaylist(playlist, callback) {

  let _playlist = prepPlaylistAttributes(playlist);

  getCSRFToken((res)=> {
    superagent.put(`/playlists/${playlist.server_info.id}`)
    .set('X-CSRF-Token', res.token)
    .send(_playlist)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err || !res.ok) {
        callback({error: `${err.status} - ${err.response.statusText}`})
      } else {
        callback({error: null, res});
      }
    })
  });
}

export function featurePlaylist(id, data, callback) {
  getCSRFToken((res)=> {
    // console.log(`/playlists/${id}`)
    superagent.put(`/playlists/feature/${id}`)
    .set('X-CSRF-Token', res.token)
    .send(data)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err || !res.ok) {
        callback({error: `${err.status} - ${err.response.statusText}`})
      } else {
        callback({error: null, res});
      }
    })
  });
}

export function deletePlaylist(id, callback) {
  getCSRFToken((res)=> {
    superagent.del(`/playlists/${id}`)
    .set('X-CSRF-Token', res.token)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err || !res.ok) {
        callback({error: `${err.status} - ${err.response.statusText}`})
      } else {
        callback({error: null, res});
      }
    })
  });
}

export function pollPlaylistRenderStatus(id, callback) {
  var renderPoll;
  $.get(`/playlists/render_status/${id}`, (data)=> {
    if(data.ready) {
      callback(data);
    } else {
      renderPoll = setTimeout(()=>{
        pollPlaylistRenderStatus(id, callback)
      }, 1000);
    }
  });
}


export function getAllPlaylists(page) {
  return $.ajax({url: `/all?page=${page}`});
}



