import { Link } from 'react-router';
import { connect } from 'react-redux';
import childrenWithProps from '../utils/childrenWithProps';
import {MD} from '../constants';
import MediaQuery from 'react-responsive';
import FlashMessage from './FlashMessage';
import UserControls from './UserControls';
import LoadingAnimation from './LoadingAnimation';
import Login from './Login';
import SaveButton from  './SaveButton';
import Share from './Share';
import Icon from './Icon';
import DeleteButton from './DeleteButton';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      menu_open: false
    }
  }

  componentDidMount() {
    var supportsBackgroundBlendMode = window.getComputedStyle(document.body).backgroundBlendMode;
    const supportClasses = {
      blendmodes: (supportsBackgroundBlendMode ? '' : 'no-') + 'background-blend-mode'
    }

    this.supportClasses = _.values(supportClasses).join(' ')
  }

  render() {
    const { logged_in, current_user, show_login } = this.props.Account;
    const { show_share } = this.props.Share;
    const { path } = this.props.routing;
    const { menu_open } = this.state;
    const dir = path.split('/').pop();
    const pathClass = (dir !== '' ? `path-${dir}` : '');
    const AppClassNames = [dir, pathClass].join(' ')
    const preview_button = <button className='btn btn-outline'>Preview</button>;
    return (
      <div className={AppClassNames}>
        <nav className="md-py2 site__navigation">
          <div className='container flex flex-center flex-justify'>

            <Link to="/" className='black'>
              <img className='logo__image' src='/images/wikiedu-logo.svg' height='30'/>
              <img className='logo__text' src='/images/wikipedia-playlist-type.svg' height='20'/>
            </Link>

            <UserControls/>
          </div>
        </nav>


        <FlashMessage />

        <div className='site__content'>
          {this.props.children}
        </div>
        {this._devTools()}

        <footer className='container p2 mt3 flex center flex-justify'>
          {(logged_in && current_user ? <span>You are logged in. <a href="#" className='' data-sign-out>Logout</a></span> : null)}
          <DeleteButton />
        </footer>

        {(show_share? <Share/> : null )}
        {(show_login ? <Login/> : null )}
      </div>
    )
  }

  _loading() {
    if(this.props.Share.share_rendering){
      return(<LoadingAnimation />)
    } else {
      return null;
    }
  }

  _devTools() {
    // return null;
    if(process.env.NODE_ENV === 'development') {
      var  DevTools = require('../containers/DevTools');
      return <MediaQuery query={`(min-device-width: ${MD})`}><DevTools/></MediaQuery>
    } else {
      return null;
    }
  }


}

export default connect( state => {return state})(App)
