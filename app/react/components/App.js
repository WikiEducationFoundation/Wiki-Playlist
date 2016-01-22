import { Link } from 'react-router';
import { connect } from 'react-redux';
import childrenWithProps from '../utils/childrenWithProps';
import DevTools from '../containers/DevTools';
import {MD} from '../constants';
import MediaQuery from 'react-responsive';
import FlashMessage from './FlashMessage';
import UserControls from './UserControls';
import LoadingAnimation from './LoadingAnimation';

class App extends React.Component {

  render() {
    
    return (
      <div className="px2">

        <h1 className="h4">
            <Link to="/">Wikipedia Playlist</Link>
        </h1>

        <FlashMessage />

        {this._loading()}

        <nav className="py2 flex">
          <UserControls/>
        </nav>

        {this.props.children}
        {this._devTools()}
      </div>
    )
  }

  _loading() {
    if(this.props.share_rendering){
      return(<LoadingAnimation />)
    } else {
      return null;
    }
  }

  _devTools() {
    // return null;
    if(process.env.NODE_ENV === 'development') {
      return <MediaQuery query={`(min-device-width: ${MD})`}><DevTools/></MediaQuery>
    } else {
      return null;
    }
  }
}

export default connect( state => {return state.Playlist})(App)
