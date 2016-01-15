import { connect } from 'react-redux';

class FlashMessage extends React.Component {
  render() {
    const { message, type } = this.props;
    const renderMessage = (
      <div className={`message message--${type}`}>
        {message}
      </div>
    )
    return (message ? renderMessage : null);
  }
}

export default connect( state => {return state.FlashMessage})(FlashMessage)