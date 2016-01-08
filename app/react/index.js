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
import ArticleSearch from './components/ArticleSearch';
import ArticlePreview from './components/ArticlePreview';
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
            <Route path="/playlist" component={PlaylistEditor}>
              <Route path="/playlist/article/search" component={ArticleSearch} />
              <Route path="/playlist/article/preview" component={ArticlePreview} />
              <Route path="/playlist/article/images" component={ImageSelector} />
            </Route>
          </Route>
        </Router>
      </Provider>
      
    )
  }
}

registerComponent('PlaylistApp', PlaylistApp);

