const superagent = require('superagent');

export function getCSRFToken(callback) {
  superagent.get('/csrf-token').end(function(err, res) {
    if(err || !res.ok) {
      console.log('Error getting csrf', err);
    } else {
      callback(res.body);
    }
  })
}