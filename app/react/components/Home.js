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
      <div className='home container'>
        <div className='prose home-copy'>
          <h2>Welcome to the Wikipedia Playlist!</h2>
          <p>We’re excited to see what you share! Here’s how to get started.</p>
          <ol>
            <li className='mb1'>Click the blue-green “Create a Playlist” button on the top right corner to go to the Playlist creator. Name your Playlist, for example, “Exploring the Universe with Wikipedia.” </li>
            <li className='mb1'>You’ll see the option to “Add a caption to your Playlist.” Here you can create an introductory note about why you’ve selected the topics in your list. </li>
            <li className='mb1'>Then, “Add Wikipedia Article.” Typing in any topic will load a smart search so you can find the article on the topic you’re looking for. Review the article and then “Add to Playlist.” </li>
            <li className='mb1'>A preview card will open, and you can change the image or change your article selection. Once you like your work, click “Save” on the bottom right of the card. </li>
            <li className='mb1'>When you’ve made your list, you can save the list at the bottom of the cards, at which point you’ll be given a chance to either share it on various social media sites, email the list to someone, or copy the permalink for other uses.</li>
          </ol>
          <p><strong>PLEASE DO NOT SHARE YOUR LIST ON SOCIAL MEDIA UNTIL FEBRUARY 8.</strong> </p>
          <p>Instead, please email a link to <a href='mailto:playlist@wikiedu.org'>playlist@wikiedu.org</a> so we know you’ve completed it, and we can feature it on the playlist.wiki home page. </p>
        </div>
        {this._renderPlaylists()}
        <a className="center-align mt2" target="_blank" href="http://playlist.wiki/playlist/bizarre-mythological-scottish-creatures">View Playlist Example</a>
        <img src='/images/example-page.png'/>
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
                        onClick={()=> {
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
