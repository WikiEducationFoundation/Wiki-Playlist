import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

var createFinalStore;
if(process.env.NODE_ENV === 'development') {
  var  DevTools = require('../containers/DevTools');
  createFinalStore = compose(
    DevTools.instrument(),
    applyMiddleware(
      thunkMiddleware
    )
  )(createStore);
} else {
  createFinalStore = compose(
    applyMiddleware(
      thunkMiddleware
    )
  )(createStore);
}

// const createFinalStore = compose(
//   DevTools.instrument(),
//   applyMiddleware(
//     thunkMiddleware
//   )
// )(createStore);

export default function configureStore(initialState) {
  const store = createFinalStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}