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

  render() {
    const { logged_in, current_user, show_login } = this.props.Account;
    const { show_share } = this.props.Share;
    const { menu_open } = this.state;
    const preview_button = <button className='btn btn-outline'>Preview</button>;
    return (
      <div className="">
        <nav className="md-py2 site__navigation">
          <div className='container flex flex-center flex-justify'>
            <Link to="/" className='black'>
              <img src='//upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg' height='30'/>
              <span className='px2'>Wikipedia Playlist</span>
            </Link>
            <MediaQuery query={`(min-device-width: ${MD})`}>
              <UserControls/>
            </MediaQuery>

            <MediaQuery query={`(max-device-width: ${MD})`}
                        onClick={()=>{
                          this.setState({menu_open: !menu_open});
                        }}>
              <button className='action'><Icon size="30px" icon="menu" fill={'teal'} /></button>
            </MediaQuery>
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
