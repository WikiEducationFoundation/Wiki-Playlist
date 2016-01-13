import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import es6BindAll from "es6bindall"; 
import TextArea from './TextArea';
import { setPlaylistCaption } from '../actions'

class PlaylistCaption extends React.Component {
  
  constructor(props) {
    super();

    this.dispatch = props.dispatch;
    const { caption } = props.Playlist;

    es6BindAll(this, [
      '_goToImageSelector',
      '_saveCaption',
      '_storeCaption'
    ]);

    this.state = {
      caption: caption
    }
  }

  render() {
    return (
      <div className='full-height flex flex-column flex-justify'>
        <div className='article-caption__input p1'>
          <TextArea max={200}
            callback={this._storeCaption}
            value={this.state.caption}
            placeholder='Add a caption'/>
          <button className='btn' onClick={this._saveCaption}>Save</button>
        </div>
      </div>)
  }

  _goToImageSelector() {
    this.dispatch(pushPath('/playlist/article/images'));
  }

  _saveCaption() {
    this.dispatch(setPlaylistCaption(this.state.caption))
    this.dispatch(pushPath('/playlist'));
  }

  _storeCaption(caption) {
    this.setState({
      caption: caption
    })
  }
}




export default connect( state => {return state})(PlaylistCaption);