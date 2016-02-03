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
  setPlaylistShouldSave
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
    const { should_save } = this.props.Playlist;
    $(document).on('authSuccess', (data) => {
      if(data.username !== undefined && should_save) {
        this._savePlaylist();
        this.dispatch(setPlaylistShouldSave(false));
      }
    });
  }

  _saveButton() {
    const { logged_in, current_user } = this.props.Account;
    const { published } = this.props.Playlist;
    if(logged_in){
      return (
        <button 
          className='btn ml1' 
          onClick={this._savePlaylist.bind(this)}>
          {(published ? 'Save Changes' : 'Save Playlist')} 
        </button>);
    } else {
      return null;
    }
  }

  _savePlaylist() {
    const { published, total_articles, title } = this.props.Playlist;
    this.dispatch(updateCurrentEditingArticle(null));
    if(title === '') {
      window.scrollTo(0,0)
      flashMessage(this.dispatch,  {text: "Please give your playlist a title.", type: 'action'});
      return;
    }
    // todo:  if 'can publish' instead of comparison here
    if(total_articles < MINIMUM_ARTICLES) {
      const remainder = MINIMUM_ARTICLES - total_articles;
      window.scrollTo(0,0)
      flashMessage(this.dispatch,  {text: `Please find at least ${remainder} more page${(remainder > 1 ? 's' : '')} to save.`, type: 'action'});
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


export default connect( state => {return state})(SaveButton)