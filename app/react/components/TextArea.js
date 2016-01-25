import es6BindAll from "es6bindall";

export default class TextArea extends React.Component {
  constructor(props) {
    super();
    this.max = props.max;

    es6BindAll(this, [
      '_handleChange',
      '_handleInput',
    ]);

    this.state = {
      text: (props.value || ''),
      chars_left: this.max
    }
  }

  render() {

    const { inputType } = this.props;

    const inputProps = {
      className: 'field',
      value: this.props.value,
      placeholder: this.props.placeholder,
      onChange: this._handleChange,
      onKeyPress: this._handleInput
    }

    let input = <input {...inputProps} />;
    if(inputType === 'textarea') {
      input = <textarea {...inputProps} />;
    }

    return (
      <div>
        <div><small className='gray'>Characters left: {this.state.chars_left}</small></div>
        {input}
      </div>)
  }

  _handleChange(e) {
    const text = e.target.value.substring(0, this.max);
    e.target.value = text;
    const chars_left = this.max - text.length;
    this.setState({
      text: text,
      chars_left: chars_left
    }, () => {
      // Send text to parent through provided callback
      this.props.callback(this.state.text);
    })
  }

  _handleInput(e) {
    if(this.state.chars_left <= 0) {
      e.preventDefault();
    }
  }
}