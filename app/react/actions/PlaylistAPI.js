const superagent = require('superagent');
let jsonp = require('superagent-jsonp');
import { getCSRFToken } from './rails';

/* Playlist Actions
--------------------------------------------- */

const allowed_playlist_attributes = ["title", "caption", "articles_attributes", "id", "featured"];
const allowed_article_attributes = ["pageId", "title", "url", "description", "image", "id", "position"];

function filterArticleKeys(playlist) {
  let articles = playlist.articles.slice(0);
  articles.map((article, i) => {
    articles[i] = _.pick(article, allowed_article_attributes);
    articles[i].position = i;
    if(article.image !== undefined) {
      articles[i].image = article.image.url;
    }
  });
  return articles;
}

function filterPlaylistKeys(playlist) {
  return _.pick(playlist, allowed_playlist_attributes);
}

function prepPlaylistAttributes(_playlist) {
  let playlist = _.assign({}, _playlist);
  if(playlist.articles !== undefined) {
    playlist.articles_attributes = filterArticleKeys(playlist);  
  }
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
  let data = prepPlaylistAttributes(playlist);
  const id = playlist.server_info.id;
  getCSRFToken((res)=> {
    superagent.put(`/playlists/${id}`)
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

export function featurePlaylist(id, data, callback) {
  getCSRFToken((res)=> {
    superagent.put(`/playlists/${id}`)
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


export function getAllPlaylists() {
  return $.ajax({url: '/all'});
}



