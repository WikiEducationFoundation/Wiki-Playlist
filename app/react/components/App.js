import { Link } from 'react-router';
import { connect } from 'react-redux';
import childrenWithProps from '../utils/childrenWithProps';
import DevTools from '../containers/DevTools';
import { login, logout, addUser, createPlaylist } from '../actions';
import {MD} from '../constants';
import MediaQuery from 'react-responsive';

class App extends React.Component {
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

    const saveButton = (logged_in ? <button className='btn ml1' onClick={this._savePlaylist.bind(this)}>Save Playlist</button> : null);

    return (
      <div className="px2">
        
        
        <h1 className="h4">
            <Link to="/">Wikipedia Playlist</Link>
          </h1>
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
    createPlaylist(this.props.Playlist, (res) => {
      console.log('_savePlaylist response', res);
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

