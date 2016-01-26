_.mixin(require("lodash-deep"));
import { moveArrayItem } from '../utils/Array';
import { combineReducers } from 'redux';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';
import {
  LOGIN,
  LOGOUT,
  ADD_USER,
  UPDATE_QUERY, 
  ADD_SEARCH, 
  SEARCHING,
  SET_EDIT_ARTICLE,
  ADD_ARTICLE_CARD,
  ADD_ARTICLE,
  ADD_ARTICLE_IMAGES,
  SET_ARTICLE_IMAGE,
  SET_ARTICLE_CAPTION,
  EXPAND_ARTICLE,
  COLLAPSE_ARTICLE,
  COLLAPSE_COMPLETE,
  SET_PLAYLIST_CAPTION,
  EDITING_PLAYLIST_CAPTION,
  EDITING_PLAYLIST_TITLE,
  SET_PLAYLIST_TITLE,
  RECEIVE_PLAYLIST_PERMALINK,
  RECEIVE_PLAYLIST_ERROR,
  FLASH_MESSAGE,
  HANDLE_DELETE,
  RECEIVE_SHARE_INFO,
  SHARE_IMAGE_RENDERING,
  SET_USER_ONBOARDING,
  SET_ONBOARDING_STEP
} from '../constants';


function FlashMessage(state = {
  message: null,
  type: 'default'
}, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      const {text, type} = action.message;
      return _.assign({}, state, {message: text, type: type });
    default:
      return state;
  }
}

function Onboarding(state= {
  onboarded: false,
  step: 0
}, action) {
  switch (action.type) {
    case SET_USER_ONBOARDING:
      return _.assign({}, state, { onboarded: action.bool })
    case SET_ONBOARDING_STEP:
      return _.assign({}, state, { step: action.step })
    default:
      return state;
  }
}


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
  history: {},
  searching: false
}, action) {

  switch (action.type) {

    case SEARCHING:
      return _.assign({}, state, {searching: action.bool});
  
    case UPDATE_QUERY:
      const {index, query} = action;
      let queries = state.queries.slice(0);
      queries[index] = query;
      return _.assign({}, state, {queries: queries})

    case ADD_SEARCH:
      let history = state.history;
      history[state.queries[action.index]] = action.results
      return _.assign({}, state, {history: history})
    
    default:
      return state;
  }

}


var defaultArticle = {
  title: 'Article',
  description: '',
  caption: '',
  image: '',
  images: [],
  thumbnail: '',
  url: '',
  open: false,
  has_article: false,
  pageId: null
}

function createInitialArticles() {
  let j = 0;
  let initialArticles = [];
  while(j < TOTAL_ARTICLES) {
    initialArticles.push(_.extend({}, _.clone(defaultArticle), {title: `Article ${j + 1}`}));
    j++;
  }
  return initialArticles;
}


function defaultPlaylist() {
  var articles = createInitialArticles();
  return {
    title: 'Editable Playlist Title',
    editingTitle: false,
    caption: '',
    editingCaption: false,
    total_articles: 0,
    articles: articles,
    editingArticle: null,
    animating: false,
    published: false,
    server_info: {},
    server_errors: [],
    share_rendering: false,
    share: {
      ready: false,
      url: null,
      image: null
    }
  }
}

var initialPlaylistState = defaultPlaylist();
function Playlist(state = initialPlaylistState, action) {
  switch (action.type) {
    case SET_EDIT_ARTICLE:
      return _.assign({}, state, {editingArticle: action.index})

    case ADD_ARTICLE_CARD:
      var articles = state.articles.slice(0);
      articles.push(_.clone(defaultArticle));
      return _.assign({}, state, {articles: articles})

    case SET_PLAYLIST_TITLE:
      var { text } = action;
      return _.assign({}, state, {title: text})

    case EDITING_PLAYLIST_TITLE:
      return _.assign({}, state, {editingTitle: action.bool})

    case SET_PLAYLIST_CAPTION:
      var { text } = action;
      return _.assign({}, state, {caption: text})

    case EDITING_PLAYLIST_CAPTION:
      return _.assign({}, state, {editingCaption: action.bool})

    case ADD_ARTICLE:
      let {article, index} = action;
      const { title, fullurl, pageid } = article;
      const pageId = pageid;
      const url = fullurl;
      const thumbnail = _.deepGet(article, 'thumbnail.source');
      let description = _.deepGet(article, 'terms.description.0'); 
      if(article.extract !== undefined) {
        description = article.extract;
      }
      var _article = {pageId, title, url, thumbnail, description};
      _article.has_article = true;
      var articles = state.articles.slice(0);
      articles[index] = _article;
      return _.assign({}, state, {articles: articles, total_articles: state.total_articles + 1})

    case ADD_ARTICLE_IMAGES:
      let {images} = action;
      var articles = state.articles.slice(0);
      articles[action.index].image = images[0];
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
      
    case RECEIVE_PLAYLIST_PERMALINK:
      var articles = state.articles.slice(0);
      action.data.articles.map((article, i)=> {
        var index = _.indexOf(articles, _.find(articles, {title: article.title}));
        articles[index].id = article.id;
      });
      return _.assign({}, state, {published: true, server_info: action.data, server_errors:[]})

    case HANDLE_DELETE:
      var initialPlaylistState = defaultPlaylist();
      return initialPlaylistState;

    case RECEIVE_SHARE_INFO:
      return _.assign({}, state, {share: action.data});

    case SHARE_IMAGE_RENDERING:
      return _.assign({}, state, {share_rendering: action.bool});
      
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
  Account,
  FlashMessage,
  Onboarding
});

export default rootReducer;