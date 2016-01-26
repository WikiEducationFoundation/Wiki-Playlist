import { connect } from 'react-redux';
import { Link } from 'react-router';
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
  setOnboardingStep
} from '../actions';

import {
  deletePlaylist,
  pollPlaylistRenderStatus
} from '../actions/PlaylistAPI';

import SaveButton from './SaveButton';

class UserControls extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    es6BindAll(this, [
      '_login',
      '_deleteButton',
      '_deletePlaylist'
    ]);
  }

  render() {
    const { Playlist, Account } = this.props;
    return (
      <div>
        {this._login()}
        <SaveButton/>
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
      // account = (<span>You are logged in. <a href="#" data-sign-out>Logout</a></span>);
      account = null;
    }
    return account;
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