import { combineReducers } from 'redux';
import {
  UPDATE_QUERY, FETCH_QUERY, ADD_SEARCH, search
} from '../actions';

const initialState = {
  query: '',
  history: {}
}

function searchApp(state = initialState, action) {

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

const rootReducer = combineReducers({
  searchApp
});

export default rootReducer;