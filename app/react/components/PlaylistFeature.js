export default class PlaylistFeature extends React.Component {
  render() {
    const {title, caption, articles, id, featured, color} = this.props;
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
          <h3 className='white'>{title}</h3>
          {articles.slice(0,2).map((article, i) => {
            const { id, image, title } = article;
            return (
              <div key={`featured_playlist ${id}${i}`} className='playlist-feature__card'>
                <img src={image}/>
                <h3>{title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}