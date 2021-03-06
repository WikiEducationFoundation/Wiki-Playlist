import { connect } from 'react-redux';
import { PropTypes } from 'react';
import Icon from './Icon';
import es6BindAll from "es6bindall";
import tinycolor from 'tinycolor2';
import TextArea from 'react-textarea-autosize'

class EditableText extends React.Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
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
    if(!this.state.editing) {
      this.setState({value: props.value});
    }
  }

  truncateValue(text) {
    return text.substring(0, this.limit);
  }

  render() {
    const { editing, value } = this.state;
    const { inputType, className, color} = this.props;
    const empty = value.length < 1;
    const count = this.limit - value.length;

    const inputProps = {
      type: 'text',
      ref: 'input',
      className: `${className} invisible-input inline-block`,
      value: value,
      placeholder: this.props.placeholder,
      onChange: this._handleChange,
      onFocus: ({target}) => {
       this.setState({editing: true});
       const len = this.state.value.length * 2;
       target.setSelectionRange(len, len);
       this.setState({value: this.truncateValue(target.value)})
      },
      onBlur: (e) => {
       this._handleChange(e);
       this.setState({editing: false});
       this._save()
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
    const iconColor = tinycolor(color).darken(25);

    return (
      <div className='editable-text'>
        {(
          editing || empty ?
            <div className={(textInput ? 'flex flex-center' : '')}>
              <div className='relative'>
                {(textInput ?
                    <input {...inputProps} />
                  :
                    <TextArea {...inputProps} />)}
                <span className='character-limit'>{count}</span>
              </div>
            </div>
          :
            <div className='relative' onClick={()=>{
              this.setState({editing: true}, (e)=>{
                this.refs.input.focus();
              })}}>
              {this.props.children}<Icon className='edit-icon' size="20px" icon="edit" fill={iconColor} />
            </div>
        )}

      </div>
    )
  }

  _handleChange({target}) {
    this.setState({value: this.truncateValue(target.value)});
  }

  _save() {
    if(this.state.value.length > 0) {
      this.setState({editing: false})
    }
    this.props.save(this.state.value);
  }

  _cancel() {
    this.setState({editing: false, value: this.props.value})
  }
}

export default connect( state => {return state})(EditableText);
