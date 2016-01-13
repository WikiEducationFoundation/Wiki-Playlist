import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import es6BindAll from "es6bindall"; 
import TextArea from './TextArea';
import { setPlaylistCaption, editingPlaylistCaption } from '../actions'

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
        <div className='playlist__caption__input px1'>
          <TextArea max={200}
            inputType='textarea'
            callback={this._storeCaption}
            value={this.state.caption}
            placeholder='Add a caption'/>
          <button className='btn btn-outline' onClick={this._saveCaption}>Save</button>
        </div>
      </div>)
  }

  _goToImageSelector() {
    this.dispatch(pushPath('/playlist/article/images'));
  }

  _saveCaption() {
    this.dispatch(setPlaylistCaption(this.state.caption))
    this.dispatch(editingPlaylistCaption(false))
    this.dispatch(pushPath('/playlist'));
  }

  _storeCaption(caption) {
    this.setState({
      caption: caption
    })
  }
}




export default connect( state => {return state})(PlaylistCaption);