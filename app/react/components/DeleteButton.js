import { connect } from 'react-redux';

import {
  handleDelete,
  flashMessage,
} from '../actions';

import {
  deletePlaylist
} from '../actions/PlaylistAPI';

class DeleteButton extends React.Component {

  render() {
    return this._deleteButton();
  }

  _deleteButton() {
    const { published } = this.props.Playlist;
    const { logged_in, current_user } = this.props.Account;
    if(logged_in && published) {
      return (
        <div className='right-align'>
          <a href='#'
           className='red'
           style={{
            opacity: .9
           }}
           onClick={this._confirmDelete.bind(this)}>
           Delete Playlist</a></div>)
    } else {
      return null;
    }
  }

  _confirmDelete() {
    if(window.confirm("Are you sure you want to delete your playlist?")) {
      this._deletePlaylist();
    }
  }

  _deletePlaylist() {
    const { id } = this.props.Playlist.server_info;
    const { dispatch } = this.props;
    deletePlaylist(id, (data) => {
      if(data.error) {
        flashMessage(dispatch,  {text: data.error, type: 'error'});
      } else {
        dispatch(handleDelete());
        flashMessage(dispatch, {text: 'Playlist deleted', type: 'success'});
      }
    })
  }
}



export default connect( state => {return state})(DeleteButton);
