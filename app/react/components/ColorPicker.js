import { connect } from 'react-redux';
import { background_colors } from '../data/colors';
import { setPlaylistColor } from '../actions';

export default class ColorPicker extends React.Component {
  componentDidMount() {
    this.props.dispatch(setPlaylistColor(_.sample(background_colors)));
  }
  render() {
    return (
      <div className='playlist__background-color-picker'>
        {background_colors.map(color => {
          return (<div className='inline-block  color-swatch' 
               key={color}
               style={{
                 background: color,
                 width: 15,
                 height: 15,
                 borderRadius: '50%'
               }}
               onClick={()=>{
                this.props.dispatch(setPlaylistColor(color));
               }}></div>)
        })}
      </div>
    )
  }
}

export default connect( state => {return state})(ColorPicker)