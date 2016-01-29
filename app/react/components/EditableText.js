import { connect } from 'react-redux';
import { PropTypes } from 'react';
import Icon from './Icon';
import es6BindAll from "es6bindall";

class EditableText extends React.Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired
  }

  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    this.limit = props.limit;
    this.save = props.save;
    this.cancel = props.cancel;

    this.state = {
      editing: false,
      value: props.value
    }
     es6BindAll(this, [
      '_handleChange',
      '_save',
      '_cancel'
    ]);
  }

  componentWillReceiveProps(props) {
    this.setState({value: props.value});
  }

  truncateValue(text) {
    return text.substring(0, this.limit);
  }

  render() {
    const { editing, value } = this.state;
    const { inputType, className} = this.props;
    const empty = value.length === 0;
    const count = this.limit - value.length;

    const inputProps = {
      type: 'text',
      ref: 'input',
      className: `${className} invisible-input inline-block`,
      value: value,
      placeholder: this.props.placeholder,
      onChange: this._handleChange,
      onFocus: ({target}) =>{
       this.setState({value: this.truncateValue(target.value)})
      },
      onBlur: (e) => {
       // this._handleChange(e);
       // this.setState({editing: false});
       // this._save()
      },
      onKeyUp: ({which}) =>{
        switch(which) {
          case 27:
            this._cancel();
            break;
        }
      },
      onKeyPress: ({which}) =>{
        switch(which) {
          case 13:
            this._save();
            break;
        }
      }
    }

    const textInput = inputType !== undefined && inputType === 'text';

    return (
      <div className='editable-text'>
        {( 
          editing || empty ? 
            <div className={(textInput ? 'flex flex-center' : '')}>
              <div className='relative'>
                {(textInput ? 
                    <input {...inputProps} /> 
                  :  
                    <textarea {...inputProps} />)}
                <span className='character-limit'>{count}</span>
              </div>
              <div className='flex flex-center'>
                <button className='action cancel-button inline-block mr1 ml1' onClick={this._cancel}>&#215;</button>
                <button className='action mr1' onClick={this._save}><Icon size="25px" icon="check" fill={'teal'} /></button>
              </div>
            </div>
          : 
            <div className='relative inline-block' onClick={()=>{
              this.setState({editing: true}, ()=>{
                this.refs.input.focus();
                const len = this.state.value.length * 2;
                this.refs.input.setSelectionRange(len, len);
              })}}>
              {this.props.children}<Icon className='edit-icon' size="20px" icon="edit" fill={'black'} />
            </div>
        )}
        
      </div>
    )
  }

  _handleChange({target}) {
    this.setState({value: this.truncateValue(target.value)});
  }

  _save() {
    this.setState({editing: false})
    this.props.save(this.state.value);
  }

  _cancel() {
    this.setState({editing: false, value: this.props.value})
  }
}

export default connect( state => {return state})(EditableText);