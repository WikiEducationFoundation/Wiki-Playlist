import { Link } from 'react-router';
import { connect } from 'react-redux';
import childrenWithProps from '../utils/childrenWithProps';

class App extends React.Component {
  render() {
    // console.log(this.props);
    console.log('App', this.props)
    return (
      <div className="p2">
        <h1>PlaylistApp</h1>
        <nav className="py2 flex">
          <div className="px1">
            <Link to="/">Home</Link>
          </div>
          <div className="px1">
            <Link to="/editor">Playlist Editor</Link>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);

