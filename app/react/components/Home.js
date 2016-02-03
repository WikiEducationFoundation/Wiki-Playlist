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
      playlists: []
    }
    es6BindAll(this, [
        '_featurePlaylist'
      ]);
  }
  render() {
    return (
      <div className='home container'>
        <h1 className='color-title center'>Wikipedia Playlists</h1>
        <p className='home__introduction'>Lorem ipsum In ea nostrud do ullamco veniam officia velit aliqua pariatur fugiat cupidatat labore deserunt eu tempor sunt nulla laborum culpa voluptate laborum pariatur mollit.</p>
        {this._renderPlaylists()}
      </div>
    )
  }

  componentDidMount() {
    this._getPlaylists();
  }

  _renderPlaylists() {
    const { playlists, user } = this.state;
    if(process.env.NODE_ENV !== 'development') {
      return null;
    }

    if(playlists.length) {
      return (
        <div className='flex flex-wrap py2 px1'>
        {playlists.map(playlist =><PlaylistFeature key={playlist.id} {...playlist}/>)}
        </div>);
    } else {
      return <div>Loading Playlists...</div>;
    }
  }

  _getPlaylists() {
    getAllPlaylists().done(({data})=>{
      this.setState(data);
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
