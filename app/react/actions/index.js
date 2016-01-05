// Actions Constants

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const FETCH_QUERY = 'FETCH_QUERY';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const ADD_SEARCH = 'ADD_SEARCH';


// Action Creators

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    query
  }
}

export function addSearch(results) {
  return {
    type: ADD_SEARCH,
    results: results
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

/* Wiki Search
--------------------------------------------- */

const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

const wiki_api = "https://en.wikipedia.org/w/api.php?action=";
const opensearch = `${wiki_api}opensearch&prop=pageimages|pageterms&format=json&search=`
const query_titles = `${wiki_api}query&prop=pageimages|pageterms&format=json&piprop=thumbnail&pilimit=`
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