import { Link } from 'react-router';
import Icon from './Icon';
import { flashMessage } from '../actions';
import { getAllPlaylists, featurePlaylist } from '../actions/PlaylistAPI';
import es6BindAll from "es6bindall";

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
      <div className='py4 center'>
        {this._renderPlaylists()}
      </div>
    )
  }

  componentDidMount() {
    this._getPlaylists();
  }



  _renderPlaylists() {
    const { playlists, user } = this.state;
    console.log(this.state);
    if(playlists.length === 0) {
      return null;
    }

    const feature_button = (user.admin !== undefined && user.admin ? 
                        <button className='btn mr1'
                          onClick={()=>{
                            this._featurePlaylist(id)
                          }}>Feature</button> : null);
    
    if(playlists.length) {
      return (
        <div className='flex flex-wrap py4'>
        {playlists.map(playlist =>{
          const {title, caption, articles, id} = playlist;
          const permalink = playlist.url;
          return (
            <div key={permalink} className='flex card mb2'>
              <div className='p2 flex flex-justify flex-grow'>
                <h2 className='<mr2></mr2>'>{title}</h2>

                <div>
                  {feature_button}
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
    featurePlaylist(id, {featured: true}, (data) => {
      if(data.error) {
        flashMessage(this.dispatch,  {text: data.error, type: 'error'});
      } else {
        this._getPlaylists();
      }
    })
  }
}