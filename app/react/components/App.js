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
      <div className="">
        <nav className="py2 site__navigation">
          <div className='container flex flex-center flex-justify'>
            <Link to="/" className='black'>
              <img src='//upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg' height='30'/>
              <span className='px2'>Wikipedia Collections</span>
            </Link>
            <UserControls/>
          </div>
        </nav>

        <FlashMessage />

        {this._loading()}

        <div className='site__content container'>{this.props.children}</div>
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
