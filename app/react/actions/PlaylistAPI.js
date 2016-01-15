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

export function createPlaylist(playlist, callback) {
  playlist.articles_attributes = playlist.articles;
  getCSRFToken((res)=> {
    superagent.post('/playlists')
    .set('X-CSRF-Token', res.token)
    .send(playlist)
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
  playlist.articles_attributes = playlist.articles;
  getCSRFToken((res)=> {
    superagent.put(`/playlists/${playlist.server_info.id}`)
    .set('X-CSRF-Token', res.token)
    .send(playlist)
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