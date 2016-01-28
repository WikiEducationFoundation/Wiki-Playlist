import { connect } from 'react-redux';
import Icon from './Icon';
import { setPlaylistCaption } from '../actions';
import { CAPTION_LIMIT } from '../constants';
import es6BindAll from "es6bindall";

function truncatecaption(text) {
  return text.substring(0, CAPTION_LIMIT);
}

class PlaylistCaption extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    this.state = {
      editing: false,
      caption: props.caption
    }

     es6BindAll(this, [
      '_handleChange',
      '_save',
      '_cancel'
    ]);

  }
  render() {
    const { editing, caption } = this.state;
    const empty = caption.length === 0;
    const count = CAPTION_LIMIT - caption.length;
    return (
      <div>
        {( 
          editing || empty ? 
            <div>
              <textarea type='text' 
                   ref='input'
                   className=' invisible-input' 
                   value={caption} 
                   placeholder='Your Playlist caption'
                   onChange={this._handleChange}
                   onFocus={({target})=>{
                    this.setState({caption: truncatecaption(target.value)})
                   }}
                   onBlur={(e)=>{
                    this._handleChange(e);
                    this.setState({editing: false});
                    this._save()
                   }}
                   onKeyPress={({which})=>{
                    if(which === 13) {
                      this._save();
                    }
                   }} />
              <div className='flex flex-center'>
              {(editing ? (<div>
                  <span>{count}</span>
                  <button className='action cancel-button inline-block mr1 ml1' onClick={this._cancel}>&#215;</button>
                  <button className='action mr1' onClick={this._save}><Icon size="2rem" icon="check" fill={'teal'} /></button>
              </div>): null)}

              </div>

            </div>
          : 
            <p onClick={()=>{
              this.setState({editing: true}, ()=>{
                this.refs.input.focus();
                const len = this.state.caption.length * 2;
                this.refs.input.setSelectionRange(len, len);
              })
            }}>{caption} <Icon size="20px" icon="edit" fill={'silver'} /></p>
        )}

        
      </div>
    )
  }

  _handleChange({target}) {
    this.setState({caption: truncatecaption(target.value)});
  }

  _save() {
    console.log('save')
    this.setState({editing: false})
    this.dispatch(setPlaylistCaption(this.state.caption));
  }

  _cancel() {
    console.log('cancel')
    this.setState({editing: false})
    this.setState({caption: this.props.caption});
  }
}

export default connect( state => {return state})(PlaylistCaption);