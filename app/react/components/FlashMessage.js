import { connect } from 'react-redux';
import GSAP from 'react-gsap-enhancer';

class FlashMessage extends React.Component {
  componentWillReceiveProps(props) {
    
    if(!props.message || this.animating) {
      return;
    }

    this.addAnimation(()=>{
      return TweenMax.from(this.message, .25, {
        yPercent: -100,
        ease: Power2.easeOut,
        onStart: ()=>{
          this.animating = true;
          this.message.style.visibility = 'visible';
        },
        onComplete: ()=>{
          this.animating = false;
        }
      });
    })
  }

  render() {
    const { message, type } = this.props;
    const renderMessage = (
      <div ref={(message) => this.message = message} className={`container py2 message message--${type}`}>
        {message}
      </div>
    )
    return (message ? renderMessage : null);
  }
}

export default connect( state => {return state.FlashMessage})(GSAP()(FlashMessage))