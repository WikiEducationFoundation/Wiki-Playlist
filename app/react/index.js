// Style
require('./styles/index.styl');


window.React = React;
window.ReactDOM = ReactDOM;

import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router'

// Components
import App from './components/App';
import Home from './components/Home';
import PlaylistEditor from './components/PlaylistEditor';
import ArticleEditor from './components/ArticleEditor';
import ImageSelector from './components/ImageSelector';

import { createHistory } from 'history';
import configureStore from './store/configureStore';

const store = configureStore();
const history = createHistory();

syncReduxAndRouter(history, store)

class PlaylistApp extends React.Component{
  render() {
    console.log(`Running ${process.env.NODE_ENV} env.`)
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/playlist/new" component={PlaylistEditor}>
              <Route path="/playlist/new/article" component={ArticleEditor} />
              <Route path="/playlist/new/article/images" component={ImageSelector} />
            </Route>
          </Route>
        </Router>
      </Provider>
      
    )
  }
}

registerComponent('PlaylistApp', PlaylistApp);

