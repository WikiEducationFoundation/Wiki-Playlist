// Actions Constants

import {
  LOGIN,
  LOGOUT,
  ADD_USER,
  UPDATE_QUERY,
  FETCH_QUERY,
  RECEIVE_RESULTS,
  ADD_SEARCH,
  SET_EDIT_ARTICLE,
  UPDATE_PATH,
  ADD_ARTICLE_CARD,
  ADD_ARTICLE,
  ADD_ARTICLE_IMAGES,
  SET_ARTICLE_IMAGE,
  SET_ARTICLE_CAPTION,
  SET_PLAYLIST_CAPTION,
  EDITING_PLAYLIST_CAPTION,
  EDITING_PLAYLIST_TITLE,
  SET_PLAYLIST_TITLE,
  EXPAND_ARTICLE,
  COLLAPSE_ARTICLE,
  COLLAPSE_COMPLETE,
  RECEIVE_PLAYLIST_PERMALINK,
  RECEIVE_PLAYLIST_ERROR
} from '../constants';


// Action Creators


// — Account

export function login() {
  return { type: LOGIN }
}

export function logout() {
  return { type: LOGOUT }
}

export function addUser(user) {
  return { type: ADD_USER, user }
}

// — Search
export function updateQuery(index, query) {
  return {
    type: UPDATE_QUERY,
    index,
    query
  }
}

export function addSearch(results, index) {
  return {
    type: ADD_SEARCH,
    results,
    index
  }
}

export function fetchQuery(query, handler) {
  return {
    type: FETCH_QUERY,
    query: query,
    handler: handler
  }
}

export function receiveResults(results) {
  return {
    type: RECEIVE_RESULTS,
    results: results
  }
}

// — Playlist

export function editingPlaylistCaption(bool) {
  return {
    type: EDITING_PLAYLIST_CAPTION,
    bool
  }
}

export function editingPlaylistTitle(bool) {
  return {
    type: EDITING_PLAYLIST_TITLE,
    bool
  }
}

export function setPlaylistCaption(text) {
  return {
    type: SET_PLAYLIST_CAPTION,
    text
  }
}

export function setPlaylistTitle(text) {
  return {
    type: SET_PLAYLIST_TITLE,
    text
  }
}

export function receivePlaylistPermalink(data) {
  return {
    type: RECEIVE_PLAYLIST_PERMALINK,
    data
  }
}

export function receivePlaylistError(data) {
  return {
    type: RECEIVE_PLAYLIST_ERROR,
    data
  }
}

// — Article
export function addArticleCard() {
  return {
    type: ADD_ARTICLE_CARD
  }
}

export function addArticle(index, article) {
  return {
    type: ADD_ARTICLE,
    index,
    article
  }
}

export function addArticleImages(index, images) {
  return {
    type: ADD_ARTICLE_IMAGES,
    index,
    images
  }
}

export function setArticleImage(index, url) {
  return {
    type: SET_ARTICLE_IMAGE,
    index,
    url
  }
}

export function setArticleCaption(index, text) {
  return {
    type: SET_ARTICLE_CAPTION,
    index,
    text
  }
}

export function expandArticle(index) {
  return {
    type: EXPAND_ARTICLE,
    index
  }
}
export function collapseArticle(index) {
  return {
    type: COLLAPSE_ARTICLE,
    index
  }
}
export function collapseComplete() {
  return {
    type: COLLAPSE_COMPLETE
  }
}

// — Search
export function updateCurrentEditingArticle(index) {
  return {
    type: SET_EDIT_ARTICLE,
    index
  }
}


/* Wiki Search
--------------------------------------------- */

const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

const wiki_api = "https://en.wikipedia.org/w/api.php?action=";
const opensearch = `${wiki_api}opensearch&prop=pageimages|pageterms&format=json&search=`
const query_titles = `${wiki_api}query&prop=pageimages|pageterms|info|content|extracts&exintro=&explaintext=&inprop=url&format=json&piprop=thumbnail&pilimit=`
const terms_description_titles = "&wbptterms=description&titles="
const redirects = "&redirects="

export function search(query, callback) {
  superagent(opensearch + query)
  .use(jsonp)
  .end((err, res) => {
    if(err) {
      console.log('error fetching search', err);
    } else {
      searchTitles(res.body[1])
    }
  })

  function searchTitles(titles) {
    superagent(query_titles + titles.length + terms_description_titles + titles.join('|') + redirects).use(jsonp)
    .end((err, res) => {
      if(err) {
        console.log('error fetching titles', err);
      } else {
        callback(res.body.query);
      }
    })
  }
}

// Fetch Article images
const exclude_images = require('../data/exclude_images');
const query_article_images = `${wiki_api}query&redirects&generator=images&prop=imageinfo&&iiprop=url|extmetadata|metadata|commonmetadata&iiurlwidth=600&format=json&titles=`

export function fetchArticleImages(title, callback) {
  superagent(query_article_images + title)
  .use(jsonp)
  .end((err, res) => {
    if(err) {
      console.log('error fetching article images', err);
    } else {
      const imageObjects = _.values(res.body.query.pages);
      let images = [];
      imageObjects.map(obj => {
        // console.log('image info', obj);
        const {thumburl, extmetadata} = obj.imageinfo[0];
        const url = thumburl;
        var metadescription = extmetadata.ImageDescription;
        var description = "";
        if(metadescription !== undefined) {
          description = metadescription.value.replace(/(<([^>]+)>)/ig,"").substring(0, 300)
        }
        const image = {
          url,
          description
        }
        var exclude = false
        exclude_images.map(exl => {
          if(image.url.indexOf(exl) !== -1) {exclude = true;}
        });
        if(!exclude) {
          images.push(image);
        }
        
      });
      callback(images);
    }
  })
}


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
    .on('error', (err)=> {
      console.log(err.status, err.response)
      callback({ error: err.status })
    })
    .end(function(err, res) {
      if(err || !res.ok) {
        callback({error: `${err.status} - ${err.response.statusText}`})
      } else {
        callback({error: null, res});
      }
    })
  });
  
}
