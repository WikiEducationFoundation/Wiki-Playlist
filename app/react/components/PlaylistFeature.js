export default class PlaylistFeature extends React.Component {
  render() {
    const {title, caption, articles, id, featured, color, author} = this.props;
    if(!color) {
      return null;
    }
    return (
      <div 
      className='playlist-feature'
      style={{
        backgroundColor: color
      }}>
        <div className='playlist-feature__content absolute p2'>
          <div className='playlist-feature__user'>{author.username}</div>
          <h3 className='white playlist-feature__title'>{title}</h3>
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
      </div>
    );
  }
}