import { Link } from 'react-router';
import Icon from './Icon';
import { flashMessage } from '../actions';
import { getAllPlaylists, featurePlaylist } from '../actions/PlaylistAPI';
import es6BindAll from "es6bindall";
import {MD} from '../constants';
import MediaQuery from 'react-responsive';


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
      <div className='home center container'>
        <MediaQuery query={`(max-device-width: ${MD})`}>
          <div className='p2'>
            <Link className='btn btn-primary' to="/playlists">
                Create a Playlist
            </Link>
          </div>
        </MediaQuery>
        {this._renderPlaylists()}
      </div>
    )
  }

  componentDidMount() {
    this._getPlaylists();
  }

  _renderPlaylists() {
    const { playlists, user } = this.state;
    if(playlists.length === 0) {
      return null;
    }

    
    
    if(playlists.length) {
      return (
        <div className='flex flex-wrap px1'>
        {playlists.map(playlist =>{
          const {title, caption, articles, id, featured} = playlist;
          const permalink = playlist.url;
          return (
            <div key={permalink} className='flex card mb2'>
              <div className='p2 md-flex flex-justify flex-grow'>
                <h3 className='mb1'>{title}</h3>

                <div>
                  {(user.admin !== undefined && user.admin ? 
                        <button className={`btn mr1 ${(featured ? '' : 'btn-outline')}`}
                          onClick={()=>{
                            this._featurePlaylist(id)
                          }}>Feature</button> : null)}
                  <a href={permalink} className='btn btn-outline'>View Playlist</a>
                </div>
              </div>
              <div><p>{caption}</p></div>
            </div>
          )
        })}
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