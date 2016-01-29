import { background_colors } from '../data/colors';
export default class PlaylistBackgroundColor extends React.Component {
  render() {
    return (
      <div 
      className='playlist__background-color'
      style={{
        backgroundColor: this.props.color
      }}>
      </div>
    )
  }
}