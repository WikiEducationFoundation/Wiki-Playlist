_.mixin(require("lodash-deep"));
import { moveArrayItem } from '../utils/Array';
import { combineReducers } from 'redux';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';
import {
  UPDATE_QUERY, 
  FETCH_QUERY, 
  ADD_SEARCH, 
  search, 
  SET_EDIT_ARTICLE,
  ADD_ARTICLE_CARD,
  ADD_ARTICLE,
  ADD_ARTICLE_IMAGES,
  SET_ARTICLE_IMAGE,
  SET_ARTICLE_CAPTION,
  EXPAND_ARTICLE,
  COLLAPSE_ARTICLE
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



let j = 0;
var defaultArticle = {
  title: 'Article',
  description: '',
  caption: '',
  image: '',
  images: [],
  thumbnail: '',
  url: '',
  open: false,
  has_article: false
}

let initialArticles = [];
while(j < TOTAL_ARTICLES) {
  initialArticles.push(_.clone(defaultArticle));
  j++;
}

function Playlist(state = {
  articles: initialArticles,
  editingArticle: null
}, action) {
  switch (action.type) {
    case SET_EDIT_ARTICLE:
      return Object.assign({}, state, {editingArticle: action.index})

    case ADD_ARTICLE_CARD:
      var articles = state.articles.slice(0);
      console.log('ADD_ARTICLE_CARD')
      articles.push(_.clone(defaultArticle));
      return Object.assign({}, state, {articles: articles})

    case ADD_ARTICLE:
      let {article, index} = action;
      const {title, fullurl} = article;
      const url = fullurl;
      const thumbnail = _.deepGet(article, 'thumbnail.source');
      let description = _.deepGet(article, 'terms.description.0'); 
      if(article.extract !== undefined) {
        description = article.extract;
      }
      var _article = {title, url, thumbnail, description};
      _article.has_article = true;
      var articles = state.articles.slice(0);
      articles[index] = _article;
      return Object.assign({}, state, {articles: articles})

    case ADD_ARTICLE_IMAGES:
      let {images} = action;
      var articles = state.articles.slice(0);
      articles[action.index].images = images;
      return Object.assign({}, state, {articles: articles})

    case SET_ARTICLE_IMAGE:
      var articles = state.articles.slice(0);
      var article = articles[action.index];
      article.image = action.url;
      const imageIndex = article.images.indexOf(action.url);
      moveArrayItem(article.images, imageIndex, 0);
      return Object.assign({}, state, {articles: articles})

    case SET_ARTICLE_CAPTION:
      var articles = state.articles.slice(0);
      articles[action.index].caption = action.text;
      return Object.assign({}, state, {articles: articles})

    case EXPAND_ARTICLE:
      var articles = state.articles.slice(0);
      articles[action.index].open = true;
      return Object.assign({}, state, {articles: articles})

    case COLLAPSE_ARTICLE:
      var articles = state.articles.slice(0);
      articles[action.index].open = false;
      return Object.assign({}, state, {articles: articles})

    case UPDATE_PATH:
      if(action.payload.path === '/playlist') {
        var articles = state.articles.slice(0);
        articles.map(article =>{
          if(article.open) {
            article.open = false;
          }
        });
        return Object.assign({}, state, {
          articles: articles,
          editingArticle: null
        })
      } else {
        return state;
      }
      


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