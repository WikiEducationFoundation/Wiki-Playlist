const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

/* Playlist Actions
--------------------------------------------- */

function getCSRFToken(callback) {
  superagent.get('/csrf-token').end(function(err, res) {
    if(err || !res.ok) {
      console.log('Error getting csrf', err);
    } else {
      callback(res.body);
    }
  })
}


const allowed_article_attributes = ["pageId", "title", "url", "description", "image"];
function prepPlaylistAttributes(_playlist) {
  let playlist = _.assign({}, _playlist);
  let articles = playlist.articles.slice(0);
  articles.map((article, i) => {
    articles[i] = _.pick(article, allowed_article_attributes);
    articles[i].image = article.image.url;
  });
  playlist.articles_attributes = articles;
  delete playlist.articles;
  return playlist;
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