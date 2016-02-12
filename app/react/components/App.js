import { Link } from 'react-router';
import { connect } from 'react-redux';
import childrenWithProps from '../utils/childrenWithProps';
import {MD, MINIMUM_ARTICLES} from '../constants';
import MediaQuery from 'react-responsive';
import FlashMessage from './FlashMessage';
import UserControls from './UserControls';
import LoadingAnimation from './LoadingAnimation';
import Login from './Login';
import SaveButton from  './SaveButton';
import Share from './Share';
import Icon from './Icon';
import DeleteButton from './DeleteButton';
import {addSupportClasses} from '../utils/CSSSupportClasses';
import { pushPath } from 'redux-simple-router';
import es6BindAll from "es6bindall";

import {
  logoutUser,
  openLoginPopup,
  getUserStatus
} from '../actions/UserAPI';

import {
  login,
  logout,
  showLogin,
  closeLogin,
  addUser,
  handleDelete,
  receivePlaylistPermalink,
  addFlashMessage,
  flashMessage,
  receiveShareInfo,
  setShareImageRendering,
  setUserOnboarding,
  setOnboardingStep,
  updateCurrentEditingArticle,
  showShare,
  setPlaylistShouldSave
} from '../actions';

import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  pollPlaylistRenderStatus
} from '../actions/PlaylistAPI';


class App extends React.Component {
  supportClasses: ''

  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    this.state = {
      menu_open: false
    }

    es6BindAll(this, [
      '_savePlaylist',
      '_handleSaveSuccess'
    ]);
  }

  componentDidMount() {
    addSupportClasses();

    $(document).on('authSuccess', (data) => {
      const { should_save } = this.props.Playlist;
      if(data.username !== undefined && should_save) {
        this._savePlaylist();
        this.dispatch(setPlaylistShouldSave(false));
      }
    });
  }

  render() {
    const { logged_in, current_user, show_login } = this.props.Account;
    const { show_share } = this.props.Share;
    const { path } = this.props.routing;
    const { menu_open } = this.state;
    const preview_button = <button className='btn btn-outline'>Preview</button>;
    const current_path = path.split('/').pop();
    return (
      <div className={'path-' + current_path}>
        <nav className="md-py2 site__navigation">
          <div className='container flex flex-center flex-justify'>
            <Link to="/" className='black'>
              <img className='logo__image' src='/images/wikiedu-logo.svg' height='30'/>
              <img className='logo__text' src='/images/wiki-playlist-type.svg' height='20'/>
            </Link>
            <UserControls/>
          </div>
        </nav>

        <FlashMessage />

        <div className={'site__content ' + current_path}>
          {this.props.children}
        </div>
        {this._devTools()}

        <footer className='site__footer container mt3 center flex-justify'>
          <div className='flex flex-justify border-bottom p2'>
            {(logged_in && current_user ? <span>You are logged in. <a href="#" className='' data-sign-out>Logout</a></span> : null)}
            <DeleteButton />
          </div>
          <div className="py2 px1"><small>Wiki Playlist is a project of the <a href='http://wikiedu.org/'>Wiki Education Foundation</a>, and subject to Wiki Ed&#39;s <a href='https://wikiedu.org/terms-of-service/'>Terms of Service</a> and <a href='https://wikiedu.org/privacy-policy/'>Privacy Policy</a>. Text and images on Wikipedia articles are available under free licenses thanks to the tireless work of volunteers at Wikipedia and Wikimedia Commons.</small></div>
        </footer>

        {(show_share? <Share/> : null )}
        
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


  _savePlaylist() {
    const { published, can_save, title } = this.props.Playlist;
    this.dispatch(updateCurrentEditingArticle(null));
    if(title === '') {
      window.scrollTo(0,0)
      flashMessage(this.dispatch,  {text: "Please give your playlist a title.", type: 'action'});
      return;
    }

    if(!can_save) {
      window.scrollTo(0,0)
      flashMessage(this.dispatch,  {text: `Please find at least ${MINIMUM_ARTICLES} more Articles${(remainder > 1 ? 's' : '')} to save.`, type: 'action'});
    } else {
      const saveMethod = (published ? updatePlaylist : createPlaylist)
      saveMethod(this.props.Playlist, (data) => {
        if(data.error) {
          flashMessage(this.dispatch,  {text: data.error, type: 'error'});
        } else {
          this._handleSaveSuccess(data.res.body);
        }
      })
    }
  }

  _handleSaveSuccess(data, published) {
    const { id, articles, permalink } = data;
    var playlist_data = {id, permalink, articles};
    this.dispatch(receivePlaylistPermalink(playlist_data));
    this.dispatch(setShareImageRendering(true));
    this.dispatch(showShare(true));
    flashMessage(this.dispatch, {text: `Playlist ${(published ? 'updated' : 'saved')}!`, type: 'success'});
    pollPlaylistRenderStatus(id, (data)=>{
      this.dispatch(receiveShareInfo(data));
      this.dispatch(setShareImageRendering(false));
    })
  }


}

export default connect( state => {return state})(App)
