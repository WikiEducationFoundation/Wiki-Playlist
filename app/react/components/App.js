import { Link } from 'react-router';
import { connect } from 'react-redux';
import childrenWithProps from '../utils/childrenWithProps';
import DevTools from '../containers/DevTools';

class App extends React.Component {
  render() {
    return (
      <div className="p2">
        <h1>Wikipedia Playlist</h1>
        <nav className="py2 flex">
          <div className="px1">
            <Link to="/">Home</Link>
          </div>
          <div className="px1">
            <Link to="/playlist">Create a Playlist</Link>
          </div>
        </nav>
        {this.props.children}
        {this._devTools()}
      </div>
    )
  }

  _devTools() {
    // return null;
    if(process.env.NODE_ENV === 'development') {
      return <DevTools/>
    } else {
      return null;
    }
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);

