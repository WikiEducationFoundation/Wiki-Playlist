import { connect } from 'react-redux';
import { flashMessage } from '../actions';
import { getAllPlaylists, featurePlaylist } from '../actions/PlaylistAPI';

class PlaylistFeature extends React.Component {
  constructor(props) {
    super();
    this.state = {
      featured: props.featured
    }
  }
  render() {
    const {title, caption, articles, id, color, user, current_user, url, all} = this.props;
    const {featured} = this.state;
    const { admin } = current_user;
    const { avatar, username, verified, name } = user;
    return (
      <div 
      className='playlist-feature'
      style={{
        backgroundColor: color
      }}>
        <a href={url} className='playlist-feature__content absolute p2' onClick={this._handleClick.bind(this)}>
          <div className='playlist-feature__user flex flex-center'>
            {(avatar ? <img className='avatar' src={avatar}/> : null)}
            <span className='white'>{username}{(verified ? <img className='ml1' src='/images/verified.png' height={15}/>: null)}</span>
          </div>
          <div className='py2'>
           {(name !== undefined && name !== null && name !== username ? <div className='playlist-feature__name white'>{name}</div> : null)}
           <h3 className='white playlist-feature__title'>{(title.length > 70 ? title.substr(0, 70) + '...' : title)}</h3>
          </div>
          {(admin && all? <button className={`action ${(featured ? 'featured' : '')}`} onClick={()=> this._featurePlaylist(id)}>{(featured ? 'Featured' : 'Feature')}</button> : null)}
          <div className='playlist-feature__cards'>
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
          </div>
        </a>
      </div>
    );
  }

  _featurePlaylist(id) {
    //optimistic update
    this.setState({featured: !this.state.featured});
    const { playlists } = this.props;
    const playlist = _.findWhere(playlists, {id: id});
    console.log(playlist, id)
    featurePlaylist(id, {featured: !playlist.featured}, (data) => {
      if(data.error) {
        flashMessage(this.props.dispatch,  {text: data.error, type: 'error'});
      }
    })
  }

  _handleClick(e) {
    if($(e.target).hasClass('action')) {
      e.preventDefault();
    }
  }
}

export default connect( state => {return state})(PlaylistFeature)