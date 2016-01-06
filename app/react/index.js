window.React = React;
window.ReactDOM = ReactDOM;
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router'
import Root from './containers/Root';
import App from './components/App';
import Home from './components/Home';
import PlaylistEditor from './components/PlaylistEditor';
import ArticleEditor from './components/ArticleEditor';
import { createHistory } from 'history';
import configureStore from './store/configureStore';
require('./styles/index.styl');

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
            <Route path="/playlist/editor" component={PlaylistEditor} />
            <Route path="/playlist/article-editor" component={ArticleEditor} />
          </Route>
        </Router>
      </Provider>
      
    )
  }
}

registerComponent('PlaylistApp', PlaylistApp);

