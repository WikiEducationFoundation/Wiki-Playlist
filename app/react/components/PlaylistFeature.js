import { connect } from 'react-redux';
import { flashMessage } from '../actions';
import { getAllPlaylists, featurePlaylist } from '../actions/PlaylistAPI';

class PlaylistFeature extends React.Component {
  render() {
    const {title, caption, articles, id, featured, color, user, current_user, url} = this.props;
    // if(!color) {
    //   return null;
    // }
    const { admin } = current_user;
    const { avatar, username, verified, name } = user;
    return (
      <div 
      className='playlist-feature'
      style={{
        backgroundColor: color
      }}>
        <a href={url} className='playlist-feature__content absolute p2'>
          <div className='playlist-feature__user flex flex-center'>
            <img className='avatar' src={avatar}/>
            <span className='white'>{username}{(verified ? <img className='ml1' src='/images/verified.png' height={15}/>: null)}</span>
          </div>
          <div className='py1'>
           {(name !== undefined && name !== null ? <div className='playlist-feature__name white'>{name}</div> : null)}
           <h3 className='white playlist-feature__title'>{title} </h3>
          </div>
          {(admin? <button className={`action ${(featured ? 'featured' : '')}`} onClick={()=> this._featurePlaylist(id)}>{(featured ? 'Featured' : 'Feature')}</button> : null)}

          {articles.slice(0,3).map((article, i) => {
            const { id, image, title } = article;
            return (
              <div key={`featured_playlist ${id}${i}`} className={`playlist-feature__card card-${i}`}>
                <div className='playlist-feature__card__image' style={{
                  backgroundImage: `url(${image})`
                }}></div>
                <h4>{title}</h4>
              </div>
            )
          })}
        </a>
      </div>
    );
  }

  _featurePlaylist(id) {
    const { playlists } = this.props;
    const playlist = _.findWhere(playlists, {id: id});
    featurePlaylist(id, {featured: !playlist.featured}, (data) => {
      if(data.error) {
        flashMessage(this.props.dispatch,  {text: data.error, type: 'error'});
      } else {
        this.props.getPlaylists();
      }
    })
  }
}

export default connect( state => {return state})(PlaylistFeature)