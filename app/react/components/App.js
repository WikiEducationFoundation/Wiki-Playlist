import { Link } from 'react-router';
import { connect } from 'react-redux';
import childrenWithProps from '../utils/childrenWithProps';
import DevTools from '../containers/DevTools';
import { login, logout, addUser, createPlaylist, receivePlaylistPermalink, addFlashMessage, flashMessage } from '../actions';
import {MD} from '../constants';
import MediaQuery from 'react-responsive';
import FlashMessage from './FlashMessage';

class App extends React.Component {

  constructor(props) {
    super()
    this.dispatch = props.dispatch
  }
  render() {
    const { logged_in, current_user } = this.props.Account;

    let account = <Link to="/playlist/login">Login</Link>;
    if(logged_in && current_user) {
      account = (
        <span>
          <span>You are logged in. <a href="#" data-sign-out>Logout</a></span>
        </span>
        );
    }

    const { server_errors, published } = this.props.Playlist;
    const errors = (server_errors.length ? <p className='error'>{server_errors.pop()}</p> : null);
    const saveButton = (logged_in ? <button className='btn ml1' onClick={this._savePlaylist.bind(this)}>{(published ? 'Update' : 'Save')} Playlist</button> : null);

    return (
      <div className="px2">

        <h1 className="h4">
            <Link to="/">Wikipedia Playlist</Link>
          </h1>
        <FlashMessage />
        <nav className="py2 flex">
          
          <div className="px1">
            <Link to="/playlist">Create a Playlist</Link>
          </div>
          <div className="px1">
            {account}
          </div>

          {saveButton}
        </nav>
        

        
        {this.props.children}
        
        
        {this._devTools()}
      </div>
    )
  }

  _savePlaylist() {
    const { published } = this.props.Playlist;
    createPlaylist(this.props.Playlist, (data) => {
      if(data.error) {
        flashMessage(this.dispatch,  {text: data.error, type: 'error'});
      } else {
        this.dispatch(receivePlaylistPermalink(data.res.body));
        flashMessage(this.dispatch, {text: `Playlist ${(published ? 'updated' : 'saved')}!`, type: 'success'});
      }
    })
  }


  _devTools() {
    // return null;
    if(process.env.NODE_ENV === 'development') {
      return <MediaQuery query={`(min-device-width: ${MD})`}><DevTools/></MediaQuery>
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    $(document).on('authSuccess', ()=>{dispatch(login())});
    $(document).on('authLogout', ()=>{dispatch(logout())});
    $(document).on('authUser', (data)=>{
      const { email, username } = data;
      dispatch(addUser({ 
        email,
        username
      }))
    });
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);

