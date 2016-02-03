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
        </div>
      </div>
    );
  }
}