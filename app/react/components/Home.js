import { Link } from 'react-router';
import Icon from './Icon';
import { getAllPlaylists } from '../actions/PlaylistAPI';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    }
  }
  render() {
    return (
      <div className='py4 center'>
        {this._renderPlaylists()}
      </div>
    )
  }

  componentDidMount() {
    getAllPlaylists().done(({playlists})=>{
      this.setState({playlists: playlists});
    })
  }

  _renderPlaylists() {
    const { playlists } = this.state;
    if(playlists.length === 0) {
      return null;
    }
    if(playlists.length) {
      return (
        <div className='flex flex-wrap py4'>
        {playlists.map(playlist =>{
          const {title, caption, articles} = playlist;
          const permalink = playlist.url;
          return (
            <div key={permalink} className='flex card mb2'>
              <div className='p2 flex flex-justify flex-grow'>
                <h2 className='<mr2></mr2>'>{title}</h2>
                <div><a href={permalink} className='btn btn-outline'>View Playlist</a></div>
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
}