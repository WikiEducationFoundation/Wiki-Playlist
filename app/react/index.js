window.React = React;
window.ReactDOM = ReactDOM;
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import Root from './containers/Root';
import Home from './components/Home';
import PlaylistEditor from './components/PlaylistEditor';

require('./styles/index.styl');

class PlaylistApp extends React.Component{
  render() {
    console.log(`Running ${process.env.NODE_ENV} env.`)
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Root}>
          <IndexRoute component={Home} />
          <Route path="/editor" component={PlaylistEditor} />
        </Route>
      </Router>
    )
  }
}

registerComponent('PlaylistApp', PlaylistApp);

