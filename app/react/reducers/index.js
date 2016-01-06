_.mixin(require("lodash-deep"));
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {
  UPDATE_QUERY, 
  FETCH_QUERY, 
  ADD_SEARCH, 
  search, 
  SET_EDIT_ARTICLE,
  ADD_ARTICLE
} from '../actions';

const TOTAL_ARTICLES = 3;
let i = 0;
let initialQueries = [];
while(i < TOTAL_ARTICLES) {
  initialQueries.push('');
  i++;
}

function Search(state = {
  queries: initialQueries,
  history: {}
}, action) {

  switch (action.type) {
  
    case UPDATE_QUERY:
      const {index, query} = action;
      let queries = state.queries.slice(0);
      queries[index] = query;
      return Object.assign({}, state, {queries: queries})

    case FETCH_QUERY:
      search(action.query, action.handler)
      return state;

    case ADD_SEARCH:
      let history = state.history;
      history[state.queries[action.index]] = action.results
      return Object.assign({}, state, {history: history})
    
    default:
      return state;
  }

}

const defaultArticle = {
  title: 'Find an article',
  description: '',
  image: '',
  thumbnail: '',
  url: ''
}


let j = 0;
let initialArticles = [];
while(j < TOTAL_ARTICLES) {
  initialArticles.push(defaultArticle);
  j++;
}

function Playlist(state = {
  articles: initialArticles,
  editingArticle: null
}, action) {
  switch (action.type) {
    case SET_EDIT_ARTICLE:
      return Object.assign({}, state, {editingArticle: action.index})

    case ADD_ARTICLE:
      const {article, index} = action;
      const {title, fullurl} = article;
      const url = fullurl;
      const thumbnail = _.deepGet(article, 'thumbnail.source');
      const description = _.deepGet(article, 'terms.description.0'); 
      var _article = {title, url, thumbnail, description};
      var articles = state.articles.slice(0);
      articles[index] = _article;
      return Object.assign({}, state, {articles: articles})
    default:
      return state;
  }
}


/* Root Reducer
--------------------------------------------- */
const rootReducer = combineReducers({
  routing: routeReducer,
  Search,
  Playlist
});

export default rootReducer;