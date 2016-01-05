import GSAP from 'react-gsap-enhancer';

class Article extends React.Component {

  constructor() {
    super();
    this.open = false;
  }

  render() {
    const {title, index} = this.props;
    return(
      <div className='article--edit px2 bg-silver' onClick={this.toggleArticle.bind(this)}>
        {index + 1}. {title}
      </div>
    )
  }

  toggleArticle({target}) {

    if(!this.open) {
      this.startY = target.offsetTop;
      this.startX = target.offsetLeft;
      this.startWidth = target.offsetWidth;
      this.startHeight = target.offsetHeight;

      TweenMax.set(target, {
        top: this.startY, 
        left: this.startX,
        position: 'fixed',
        zIndex: 20
      })
      TweenMax.to(target, 1, {
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        ease: Power3.easeInOut
      })
    } else {
       TweenMax.to(target, 1, {
        top: this.startY, 
        left: this.startX, 
        width: this.startWidth, 
        height: this.startHeight,
        ease: Power3.easeInOut,
        onComplete: function() {
          target.removeAttribute("style")
        }
      })
    }

    this.open = !this.open;
  }
}


export default GSAP()(Article)