import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import es6BindAll from "es6bindall";
import ShareButton from './ShareButton';
import Icon from './Icon';
import { MINIMUM_ARTICLES } from '../constants';


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
  receivePlaylistPermalink,
  addFlashMessage,
  flashMessage,
  receiveShareInfo,
  setShareImageRendering,
  setUserOnboarding,
  setOnboardingStep,
  setPlaylistShouldSave
} from '../actions';

import {
  pollPlaylistRenderStatus
} from '../actions/PlaylistAPI';

import SaveButton from './SaveButton';
class UserControls extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    es6BindAll(this, [
      '_login'
    ]);
  }

  render() {
    const { Playlist, Account, routing } = this.props;
    const { path } = routing;
    const isPlaylistPage = path.indexOf('playlist') > -1;
    const saveButton = (Account.logged_in?  <SaveButton/> : null);
    const create_button = (
      <Link className='btn btn-primary' to="/playlists">
          Create a Playlist
      </Link>);
    return (
      <div className='user-controls'>
        {(isPlaylistPage? saveButton  : create_button)}
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
        dispatch(addUser(_.pick(data, ['username', 'avatar', 'provider', 'verified', 'admin', 'uid'])));
        dispatch(closeLogin(true));
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
    const { total_articles, articles } = this.props.Playlist;
    const { routing } = this.props;
    const isPlaylistPage = routing.path.indexOf('playlist') !== -1;
    let account_button_text = (isPlaylistPage && total_articles >= MINIMUM_ARTICLES ? 'to Save' : '');
    let account = (
      <button className={'btn btn-'+(isPlaylistPage ? 'primary' : 'outline' )+' mr1'}
              onClick={()=>{
                if(articles.length >= MINIMUM_ARTICLES) {
                  this.dispatch(setPlaylistShouldSave(true));
                }
                this.dispatch(showLogin(true));
              }}>Login {account_button_text}</button>
      );
    if(logged_in && current_user || !isPlaylistPage) {
      // account = (<span>You are logged in. <a href="#" data-sign-out>Logout</a></span>);
      account = null;
    }
    return account;
  }
}

export default connect( state => {return state})(UserControls)
