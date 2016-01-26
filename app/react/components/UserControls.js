import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import { MINIMUM_ARTICLES } from '../constants';
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
  setOnboardingStep
} from '../actions';

import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  pollPlaylistRenderStatus
} from '../actions/PlaylistAPI';

class UserControls extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    es6BindAll(this, [
      '_login',
      '_saveButton',
      '_savePlaylist',
      '_deleteButton',
      '_deletePlaylist',
      '_handleSaveSuccess'
    ]);
  }

  render() {
    const { Playlist, Account } = this.props;
    return (
      <div>
        {this._login()}
        {this._saveButton()}
        {this._deleteButton()}
      </div>
    )
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { path } = this.props.routing;
    
    $(document).on('authSuccess', (data) => {
      // auth_success partial doesn't get user data so hit /auth/user_status endpoint
      if(data.username === undefined) { 
        getUserStatus(); 
      } else {
        dispatch(login())
        dispatch(addUser({username: data.username}));
        // dispatch(pushPath('/playlist'));
      }
    });
    $(document).on('authLogout', ()=>{dispatch(logout())});
    $(document).on('click', '[data-popup]', openLoginPopup);
    $(document).on('click', '[data-sign-out]', logoutUser);
    $(document).on('userOnboarded', (data)=>{
      this.dispatch(setUserOnboarding(data.onboarded))
    });

    getUserStatus();
  }

  _login() {
    const { logged_in, current_user } = this.props.Account;
    const { total_articles } = this.props.Playlist;
    const { routing } = this.props;
    let account_button_text = (routing.path.indexOf('playlist') !== -1 ? 'to save' : '');
    let account = (
      <button className='btn btn-primary' 
              onClick={()=>{
                this.dispatch(showLogin(true));
              }}>Login {account_button_text}</button>
      );
    if(logged_in && current_user) {
      account = (<span>You are logged in. <a href="#" data-sign-out>Logout</a></span>);
    }
    return account;
  }

  _saveButton() {
    const { logged_in, current_user } = this.props.Account;
    const { published } = this.props.Playlist;
    if(logged_in){
      return (
        <button 
          className='btn ml1' 
          onClick={this._savePlaylist.bind(this)}>
          {(published ? 'Update' : 'Save')} Playlist
        </button>);
    } else {
      return null;
    }
  }

  _savePlaylist() {
    const { published, total_articles } = this.props.Playlist;
    // Flash Message if not enough articles

    // todo:  if 'can publish' instead of comparison here
    if(total_articles < MINIMUM_ARTICLES) {
      flashMessage(this.dispatch,  {text: "Please find at least 3 articles.", type: 'action'});
    } else {
      //Otherwise save the playlist
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
    const { id, articles } = data;
    var playlist_data = {id: id, articles: articles};
    this.dispatch(receivePlaylistPermalink(playlist_data));
    this.dispatch(setShareImageRendering(true));
    flashMessage(this.dispatch, {text: `Playlist ${(published ? 'updated' : 'saved')}!`, type: 'success'});
    pollPlaylistRenderStatus(id, (data)=>{
      console.log(data);
      this.dispatch(receiveShareInfo(data));
      flashMessage(this.dispatch, {text: 'Playlist ready to share', type: 'success'});
      this.dispatch(setShareImageRendering(false));
    })
  }

  _deleteButton() {
    const { published } = this.props.Playlist;
    const { logged_in, current_user } = this.props.Account;
    if(logged_in && published) {
      return (
        <a href='#' 
           onClick={this._deletePlaylist.bind(this)}>
           Delete Playlist</a>)
    } else {
      return null;
    }
  }

  _deletePlaylist() {
    const { id } = this.props.Playlist.server_info;
    deletePlaylist(id, (data) => {
      if(data.error) {
        flashMessage(this.dispatch,  {text: data.error, type: 'error'});
      } else {
        this.dispatch(handleDelete());
        flashMessage(this.dispatch, {text: 'Playlist deleted', type: 'success'});
      }
    })
  }
}

export default connect( state => {return state})(UserControls)