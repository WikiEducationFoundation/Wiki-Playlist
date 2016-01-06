// Actions Constants

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const FETCH_QUERY = 'FETCH_QUERY';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const ADD_SEARCH = 'ADD_SEARCH';
export const SET_EDIT_ARTICLE = 'SET_EDIT_ARTICLE';
export const UPDATE_PATH = 'UPDATE_PATH';
export const ADD_ARTICLE = 'ADD_ARTICLE';


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

const query_article = `${wiki_api}query&`
const query_props = `&prop=info|images|pageprops`

export function fetchArticle(query, callback) {
  const title = `&titles=${query}`;
  superagent(query_article + query_props + title)
  .use(jsonp)
  .end((err, res) => {
    if(err) {
      console.log('error fetching search', err);
    } else {
      console.log('article data', res.body);
    }
  })
}