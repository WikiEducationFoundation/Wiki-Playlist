// Style
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');
require('./styles/index.styl');



require('./utils/ObjectAssignPolyfill');


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
import PlaylistTitle from './components/PlaylistTitle';
import ArticleCaption from './components/ArticleCaption';
import PlaylistCaption from './components/PlaylistCaption';
import ImageSelector from './components/ImageSelector';
import Login from './components/Login';

import { createHistory } from 'history';
import configureStore from './store/configureStore';

const store = configureStore();
const history = createHistory();

syncReduxAndRouter(history, store)

class PlaylistApp extends React.Component{
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/playlist" component={PlaylistEditor}>
              <Route path="/playlist/title" component={PlaylistTitle}/>
              <Route path="/playlist/caption" component={PlaylistCaption}/>
              <Route path="/playlist/article/search" component={ArticleSearch} />
              <Route path="/playlist/article/images" component={ImageSelector} />
              <Route path="/playlist/article/caption" component={ArticleCaption} />
            </Route>
            <Route path="/playlist/login" component={Login}/>
          </Route>

        </Router>
      </Provider>
      
    )
  }
}

registerComponent('PlaylistApp', PlaylistApp);

