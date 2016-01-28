import { connect } from 'react-redux';
import Icon from './Icon';
import { setPlaylistTitle } from '../actions';
import { TITLE_LIMIT } from '../constants';
import es6BindAll from "es6bindall";

function truncateTitle(text) {
  return text.substring(0, TITLE_LIMIT);
}

class PlaylistTitle extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    this.state = {
      editing: false,
      title: props.title
    }

     es6BindAll(this, [
      '_handleChange',
      '_save',
      '_cancel'
    ]);

  }
  render() {
    const { editing, title } = this.state;
    const empty = title.length === 0;
    const count = TITLE_LIMIT - title.length;
    return (
      <div>
        {( 
          editing || empty ? 
            <span className='flex flex-center'>
              <span className='relative inline-block'>
                <textarea type='text' 
                   ref='input'
                   className='h1 invisible-input' 
                   value={title} 
                   placeholder='Your Playlist Title'
                   onChange={this._handleChange}
                   onFocus={({target})=>{
                    this.setState({title: truncateTitle(target.value)})
                   }}
                   onBlur={(e)=>{
                    // this._handleChange(e);
                    // this.setState({editing: false});
                    // this._save()
                   }}
                   onKeyPress={({which})=>{
                    if(which === 13) {
                      this._save();
                    }
                   }} />
              <span className='character-limit'>{count}</span></span>
              <button className='action cancel-button inline-block mr1 ml1' onClick={this._cancel}>&#215;</button>
              <button className='action mr1' onClick={this._save}><Icon size="2rem" icon="check" fill={'teal'} /></button>

            </span>
          : 
            <h1 onClick={()=>{
              this.setState({editing: true}, ()=>{
                this.refs.input.focus();
                const len = this.state.title.length * 2;
                this.refs.input.setSelectionRange(len, len);
              })
            }}>{title} <Icon size="20px" icon="edit" fill={'silver'} /></h1>
        )}

        
      </div>
    )
  }

  _handleChange({target}) {
    this.setState({title: truncateTitle(target.value)});
  }

  _save() {
    this.setState({editing: false})
    this.dispatch(setPlaylistTitle(this.state.title));
  }

  _cancel() {
    this.setState({editing: false})
    this.setState({title: this.props.title});
  }
}

export default connect( state => {return state})(PlaylistTitle);