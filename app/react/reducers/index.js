_.mixin(require("lodash-deep"));
import { moveArrayItem } from '../utils/Array';
import { combineReducers } from 'redux';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';
import { search } from '../actions';
import {
  LOGIN,
  LOGOUT,
  ADD_USER,
  UPDATE_QUERY, 
  FETCH_QUERY, 
  ADD_SEARCH, 
  SET_EDIT_ARTICLE,
  ADD_ARTICLE_CARD,
  ADD_ARTICLE,
  ADD_ARTICLE_IMAGES,
  SET_ARTICLE_IMAGE,
  SET_ARTICLE_CAPTION,
  EXPAND_ARTICLE,
  COLLAPSE_ARTICLE,
  COLLAPSE_COMPLETE,
  SET_PLAYLIST_CAPTION
} from '../constants';



function Account(state = {
  logged_in: false,
  current_user: null
}, action) {
  switch (action.type) {
    case LOGIN:
      return _.assign({}, state, {logged_in: true});
    case LOGOUT:
      return _.assign({}, state, {logged_in: false});
    case ADD_USER:
      return _.assign({}, state, {current_user: action.user});
    default:
      return state;
  }
};

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
      return _.assign({}, state, {queries: queries})

    case FETCH_QUERY:
      search(action.query, action.handler)
      return state;

    case ADD_SEARCH:
      let history = state.history;
      history[state.queries[action.index]] = action.results
      return _.assign({}, state, {history: history})
    
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
  caption: '',
  articles: initialArticles,
  editingArticle: null,
  animating: false
}, action) {
  switch (action.type) {
    case SET_EDIT_ARTICLE:
      return _.assign({}, state, {editingArticle: action.index})

    case ADD_ARTICLE_CARD:
      var articles = state.articles.slice(0);
      console.log('ADD_ARTICLE_CARD')
      articles.push(_.clone(defaultArticle));
      return _.assign({}, state, {articles: articles})

    case SET_PLAYLIST_CAPTION:
      let { text } = action;
      return _.assign({}, state, {caption: text})

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
      return _.assign({}, state, {articles: articles})

    case ADD_ARTICLE_IMAGES:
      let {images} = action;
      var articles = state.articles.slice(0);
      articles[action.index].images = images;
      return _.assign({}, state, {articles: articles})

    case SET_ARTICLE_IMAGE:
      var articles = state.articles.slice(0);
      var article = articles[action.index];
      article.image = action.url;
      const imageIndex = article.images.indexOf(action.url);
      moveArrayItem(article.images, imageIndex, 0);
      return _.assign({}, state, {articles: articles})

    case SET_ARTICLE_CAPTION:
      var articles = state.articles.slice(0);
      articles[action.index].caption = action.text;
      return _.assign({}, state, {articles: articles})

    case EXPAND_ARTICLE:
      var articles = state.articles.slice(0);
      articles[action.index].open = true;
      return _.assign({}, state, {articles: articles, animating: true})

    case COLLAPSE_ARTICLE:
      var articles = state.articles.slice(0);
      articles[action.index].open = false;
      return _.assign({}, state, {articles: articles})


    case COLLAPSE_COMPLETE:
      var articles = state.articles.slice(0);
      articles.map(article => {article.open = false});
      return _.assign({}, state, {articles: articles, animating: false})


    case UPDATE_PATH:
      if(action.payload.path === '/playlist') {
        var articles = state.articles.slice(0);
        articles.map(article =>{
          if(article.open) {
            article.open = false;
          }
        });
        return _.assign({}, state, {
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
  Playlist,
  Account
});

export default rootReducer;