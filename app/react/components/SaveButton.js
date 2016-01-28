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
  showShare
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
    this.dispatch(updateCurrentEditingArticle(null));
    // todo:  if 'can publish' instead of comparison here
    if(total_articles < MINIMUM_ARTICLES) {
      flashMessage(this.dispatch,  {text: "Please find at least 3 articles.", type: 'action'});
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
    const { id, articles } = data;
    var playlist_data = {id: id, articles: articles};
    this.dispatch(receivePlaylistPermalink(playlist_data));
    this.dispatch(setShareImageRendering(true));
    this.dispatch(showShare(true));
    flashMessage(this.dispatch, {text: `Playlist ${(published ? 'updated' : 'saved')}!`, type: 'success'});
    pollPlaylistRenderStatus(id, (data)=>{
      this.dispatch(receiveShareInfo(data));
      // flashMessage(this.dispatch, {text: 'Playlist ready to share', type: 'success'});
      this.dispatch(setShareImageRendering(false));
    })
  }
}


export default connect( state => {return state})(SaveButton)