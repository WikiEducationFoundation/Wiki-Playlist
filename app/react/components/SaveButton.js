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
  setOnboardingStep,
  updateCurrentEditingArticle,
  showShare,
  setPlaylistShouldSave,
  showPermalink,
  resetPlaylist
} from '../actions';

import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  pollPlaylistRenderStatus
} from '../actions/PlaylistAPI';



class SaveButton extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    es6BindAll(this, [
      '_saveButton',
      '_savePlaylist',
      '_handleSaveSuccess'
    ]);
  }

  render() {
    return this._saveButton();
  }

  componentDidMount() {
    
    $(document).on('authSuccess', (data) => {
      const { should_save } = this.props.Playlist;
      if(data.username !== undefined && should_save) {
        this._savePlaylist();
        this.dispatch(setPlaylistShouldSave(false));
      }
    });
  }

  _saveButton() {
    const { logged_in, current_user } = this.props.Account;
    const { show_permalink, published } = this.props.Playlist;
    if(logged_in && show_permalink) {
      return (
        <button className='btn btn-primary' onClick={()=>{
          this.dispatch(resetPlaylist());
          this.dispatch(pushPath('/playlists'));
        }}>
          Create a Playlist
        </button>);
    }

    if(logged_in && !published){
      return (
        <button
          className='btn ml1'
          onClick={this._savePlaylist.bind(this)}>Publish Playlist</button>);
    } else {
      return <button className='action teal' onClick={()=>{
        this.dispatch(showLogin(true));
      }}>Login</button>;
    }
  }

  _savePlaylist() {
    const { published, can_save, title, remaining_to_save } = this.props.Playlist;
    this.dispatch(updateCurrentEditingArticle(null));
    if(title === '') {
      window.scrollTo(0,0)
      flashMessage(this.dispatch,  {text: "Please give your playlist a title.", type: 'action'});
      return;
    }

    if(!can_save) {
      window.scrollTo(0,0)
      flashMessage(this.dispatch,  {text: `Please find at least ${remaining_to_save} more Article${(remaining_to_save > 1 ? 's' : '')} to save.`, type: 'action'});
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
    this.dispatch(showPermalink(true));
    this.dispatch(showShare(true));
    flashMessage(this.dispatch, {text: `Playlist ${(published ? 'updated' : 'saved')}!`, type: 'success'});
    pollPlaylistRenderStatus(id, (data)=>{
      this.dispatch(receiveShareInfo(data));
      this.dispatch(setShareImageRendering(false));
    })
  }
}


export default connect( state => {return state})(SaveButton)
