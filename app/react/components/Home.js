import { Link } from 'react-router';
import Icon from './Icon';
import { flashMessage } from '../actions';
import { getAllPlaylists, featurePlaylist } from '../actions/PlaylistAPI';
import es6BindAll from "es6bindall";
import {MD} from '../constants';
import MediaQuery from 'react-responsive';
import PlaylistFeature from './PlaylistFeature';


export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      playlists: [],
      loading: true
    }
    es6BindAll(this, [
        '_featurePlaylist',
        '_getPlaylists'
      ]);
  }
  render() {
    console.log(this.state)
    return (
      <div className='home container'>
        <h1 className='color-title center'>Wikipedia Playlists</h1>
        <p className='home__introduction'>Help the Wiki Education Foundation spread the joy of knowledge! Create a Playlist of 3–5 Wikipedia articles on topics you’re most passionate, curious, or excited about. Then share your Playlist on social media.</p>
        {this._renderPlaylists()}
      </div>
    )
  }

  componentDidMount() {
    this._getPlaylists();
  }

  _renderPlaylists() {
    const { playlists, user } = this.state;
    if(playlists.length) {
      return (
        <div className='flex flex-wrap py2 px1'>
        {playlists.map(playlist =><PlaylistFeature key={playlist.id} current_user={user} {...playlist} getPlaylists={this._getPlaylists} playlists={playlists}/>)}
        </div>);
    } else if (this.state.loading) {
      return <div>Loading Playlists...</div>;
    } else {
      return null;
    }
  }

  _getPlaylists() {
    getAllPlaylists().done(({data})=>{
      this.setState(_.assign({}, data, {loading: false}));
    })
  }

  _featurePlaylist(id) {
    const { playlists } = this.state;
    const playlist = _.findWhere(playlists, {id: id});
    featurePlaylist(id, {featured: !playlist.featured}, (data) => {
      if(data.error) {
        flashMessage(this.dispatch,  {text: data.error, type: 'error'});
      } else {
        this._getPlaylists();
      }
    })
  }
}
