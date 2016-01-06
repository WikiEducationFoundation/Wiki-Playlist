import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {
  UPDATE_QUERY, 
  FETCH_QUERY, 
  ADD_SEARCH, 
  search, 
  SET_EDIT_ARTICLE
} from '../actions';


function searchApp(state = {
  query: '',
  history: {}
}, action) {

  switch (action.type) {
  
    case UPDATE_QUERY:
      return Object.assign({}, state, {query: action.query})

    case FETCH_QUERY:
      search(action.query, action.handler)
      return state;

    case ADD_SEARCH:
      let history = state.history;
      history[state.query] = action.results
      return Object.assign({}, state, {history: history})
    
    default:
      return state;
  }

}

const article = {
  title: 'Find an article',
  description: '',
  image: '',
  thumbnail: '',
  url: ''
}

function userArticles(state = {
  articles: [article, article, article],
  editingArticle: null
}, action) {
  switch (action.type) {
    case SET_EDIT_ARTICLE:
      state = Object.assign({}, state, {editingArticle: action.index})
    default:
      return state;
  }
}


/* Root Reducer
--------------------------------------------- */
const rootReducer = combineReducers({
  routing: routeReducer,
  searchApp,
  userArticles
});

export default rootReducer;