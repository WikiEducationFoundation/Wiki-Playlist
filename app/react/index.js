window.React = React;
window.ReactDOM = ReactDOM;
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import Root from './containers/Root';
import Home from './components/Home';
import PlaylistEditor from './components/PlaylistEditor';


class PlaylistApp extends React.Component{
  render() {
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

