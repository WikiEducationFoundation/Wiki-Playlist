import { connect } from 'react-redux';
import { background_colors } from '../data/colors';
import { setPlaylistColor } from '../actions';
import Icon from './Icon';

export default class ColorPicker extends React.Component {
  render() {
    return (
      <div className='playlist__background-color-picker'>
        {background_colors.map(color => {
          return (
            <div className='inline-block  color-swatch'
               key={color}
               style={{
                 background: color,
                 width: 22,
                 height: 22,
                 paddingLeft: 4,
                 borderRadius: '50%'
               }}
               onClick={()=>{
                this.props.dispatch(setPlaylistColor(color));
               }}>
               { this.props.color == color ? <Icon size="15px" icon="check" fill= "#fff" /> : null }
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect( state => {return state.Playlist})(ColorPicker)
