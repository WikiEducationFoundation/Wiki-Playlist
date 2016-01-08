// Actions Constants

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const FETCH_QUERY = 'FETCH_QUERY';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const ADD_SEARCH = 'ADD_SEARCH';
export const SET_EDIT_ARTICLE = 'SET_EDIT_ARTICLE';
export const UPDATE_PATH = 'UPDATE_PATH';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const ADD_ARTICLE_IMAGES = 'ADD_ARTICLE_IMAGES';
export const SET_ARTICLE_IMAGE = 'SET_ARTICLE_IMAGE';
export const EXPAND_ARTICLE = 'EXPAND_ARTICLE';
export const COLLAPSE_ARTICLE = 'COLLAPSE_ARTICLE';


// Action Creators

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

// — Article
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
const query_titles = `${wiki_api}query&prop=pageimages|pageterms|info&inprop=url&format=json&piprop=thumbnail&pilimit=`
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
const query_article_images = `${wiki_api}query&redirects&generator=images&prop=imageinfo&&iiprop=url&format=json&titles=`

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
        const url = obj.imageinfo[0].url;
        var exclude = false
        exclude_images.map(exl => {
          if(exl.indexOf(url) !== -1) {exclude = true;}
        });
        if(!exclude) {
          images.push(url);
        }
        
      });
      callback(images);
    }
  })
}

