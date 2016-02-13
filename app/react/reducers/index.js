_.mixin(require("lodash-deep"));
import { background_colors } from '../data/colors';
import { moveArrayItem } from '../utils/Array';
import { combineReducers } from 'redux';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';
import {
  LOGIN,
  SHOW_LOGIN,
  CLOSE_LOGIN,
  LOGOUT,
  ADD_USER,
  UPDATE_QUERY, 
  ADD_SEARCH, 
  SEARCHING,
  SET_EDIT_ARTICLE,
  ADD_ARTICLE_CARD,
  ADD_ARTICLE,
  ARTICLE_LOADING,
  REMOVE_ARTICLE_CARD,
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
  SET_ONBOARDING_STEP,
  SHOW_SHARE,
  CLOSE_SHARE,
  UPDATE_PLAYLIST_USERNAME,
  SET_PLAYLIST_COLOR,
  PLAYLIST_SHOULD_SAVE,
  REORDER_ARTICLE_IMAGES,
  MINIMUM_ARTICLES,
  SHOW_PERMALINK,
  RESET_PLAYLIST,
  GO_TO_NEXT_ARTICLE
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

function Share(state= {
  show_share: false,
  close_share: false,
  ready: false,
  share_image_url: null,
  image: null,
  share_rendering: false
}, action) {
  switch (action.type) {
    case SHOW_SHARE:
      return _.assign({}, state, {show_share: action.bool})
      break;
    
    case CLOSE_SHARE: 
      return _.assign({}, state, {close_share: action.bool})

    case RECEIVE_SHARE_INFO:
      return _.assign({}, state, action.data);

    case SHARE_IMAGE_RENDERING:
      return _.assign({}, state, {share_rendering: action.bool, close_share: false});

    default:
      return state;
  }
}


function Account(state = {
  logged_in: false,
  current_user: null,
  show_login: false,
  close_login: false
}, action) {
  switch (action.type) {
    case LOGIN:
      return _.assign({}, state, {logged_in: true});
    case LOGOUT:
      return _.assign({}, state, {logged_in: false, current_user: null});
    case SHOW_LOGIN:
      return _.assign({}, state, {show_login: action.bool})
    case CLOSE_LOGIN:
      return _.assign({}, state, {close_login: action.bool})
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
  pageId: null,
  loading: false
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
    title: '',
    color: _.sample(background_colors),
    username: '',
    editingTitle: false,
    caption: '',
    editingCaption: false,
    articles: articles,
    editingArticle: null,
    animating: false,
    published: false,
    server_info: {},
    server_errors: [],
    should_save: false,
    can_save: false,
    remaining_to_save: MINIMUM_ARTICLES,
    show_permalink: false,
    permalink: {},
    share_info: {},
    next_article: false
  }
}

var initialPlaylistState = defaultPlaylist();
function Playlist(state = initialPlaylistState, action) {
  switch (action.type) {
    case SET_EDIT_ARTICLE:
      return _.assign({}, state, {editingArticle: action.index})

    case GO_TO_NEXT_ARTICLE: 
      return _.assign({}, state, {next_article: action.bool})

    case ADD_ARTICLE_CARD:
      var articles = state.articles.slice(0);
      articles.push(_.clone(defaultArticle));
      return _.assign({}, state, {articles: articles})

    case ADD_USER:
      return _.assign({}, state, {username: action.user.username})

    case UPDATE_PLAYLIST_USERNAME:
      return _.assign({}, state, {username: action.username})

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
      const total_articles = _.where(articles, {has_article: true}).length;
      const remaining_to_save = MINIMUM_ARTICLES - total_articles;
      const can_save = total_articles >= MINIMUM_ARTICLES;
      return _.assign({}, state, {articles: articles, can_save: can_save, remaining_to_save: remaining_to_save});

    case REMOVE_ARTICLE_CARD:
      let articles = state.articles.slice(0)
      articles.splice(action.index, 1);
      return _.assign({}, state, {articles: articles})

    case ADD_ARTICLE_IMAGES:
      let {images} = action;
      var articles = state.articles.slice(0);
      articles[action.index].image = images[0].url;
      articles[action.index].image_info = images[0];
      articles[action.index].images = images;
      return _.assign({}, state, {articles: articles})

    case SET_ARTICLE_IMAGE:
      var articles = state.articles.slice(0);
      var article = articles[action.index];
      article.image = action.image.url;
      article.image_info = action.image;
      return _.assign({}, state, {articles: articles})

    case REORDER_ARTICLE_IMAGES:
      var articles = state.articles.slice(0);
      var article = articles[action.index];
      const imageIndex = _.indexOf(article.images, _.findWhere(article.images, {url: article.image}));
      if(imageIndex < 1) {
        return state;
      } else {
        article.images = moveArrayItem(article.images, imageIndex, 0);
        return _.assign({}, state, {articles: articles})
      }

    case SET_ARTICLE_CAPTION:
      var articles = state.articles.slice(0);
      articles[action.index].caption = action.text;
      return _.assign({}, state, {articles: articles})

    case ARTICLE_LOADING:
      var articles = state.articles.slice(0);
      articles[action.index].loading = action.bool;
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

    case PLAYLIST_SHOULD_SAVE:
      return _.assign({}, state, {should_save: action.bool})
      
    case RECEIVE_PLAYLIST_PERMALINK:
      var articles = state.articles.slice(0);
      action.data.articles.map((article, i)=> {
        var index = _.indexOf(articles, _.find(articles, {title: article.title}));
        if(index !== -1) {
          articles[index] = article.id;
        }
      });
      return _.assign({}, state, {published: true, server_info: action.data, server_errors:[]})

    case SHOW_PERMALINK:
      return _.assign({}, state, {permalink: state, show_permalink: action.bool })

    case HANDLE_DELETE:
      var initialPlaylistState = defaultPlaylist();
      return _.assign({}, initialPlaylistState, {username: state.username});

    case RESET_PLAYLIST:
      var initialPlaylistState = defaultPlaylist();
      return _.assign({}, initialPlaylistState, {username: state.username});

    case SET_PLAYLIST_COLOR:
      return _.assign({}, initialPlaylistState, state, {color: action.color});

    case RECEIVE_SHARE_INFO:
      return _.assign({}, state, { permalink: state, show_permalink: true, server_info: state.server_info });
      
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
  Onboarding,
  Share
});

export default rootReducer;