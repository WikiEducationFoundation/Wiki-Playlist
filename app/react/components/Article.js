import GSAP from 'react-gsap-enhancer';
import {updateCurrentEditingArticle} from '../actions';


class Article extends React.Component {

  constructor() {
    super();
    this.open = false;
  }

  render() {
    const {title, index} = this.props;
    return(
      <div className='article--edit px2 bg-silver' ref={(a) => this._article = a}>
        <div className='article--edit__title'>{index + 1}. {title} {this._openButton()}</div>
        <div className='article--edit__content'>
          {this.props.children}
          {this._closeButton()}
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive', nextProps);
    const {current} = nextProps;
    if(current) {
      console.log('current article', this._article)
      this._expand()
    } else if(this.open) {
      this._collapse()
    }
  }

  _openButton() {
    const {dispatch, index, current} = this.props;
    if(!current){
      return <button onClick={()=> {
        dispatch(updateCurrentEditingArticle(index));
      }}>Edit</button>
    } else {
      return null;
    }
  }

  _closeButton() {
    const {dispatch, index, current} = this.props;
    if(current){
      return <button onClick={()=> {
        dispatch(updateCurrentEditingArticle(null));
      }} className="close-expander">&#215;</button>
    } else {
      return null;
    }
  }

  _expand() {
    const target = this._article;
    const {top, left, height, width} = target.getBoundingClientRect();
    this.startY = top;
    this.startX = left;
    this.startWidth = width;
    this.startHeight = height;

    TweenMax.set(target, {
      css: {position: 'fixed'},
      top: this.startY, 
      left: this.startX,
      zIndex: 20
    })
    TweenMax.to(target, 1, {
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      ease: Power3.easeInOut,
      onComplete: () => {
        this.open = true;
      }
    })
  }

  _collapse() {
    const target = this._article;
    TweenMax.to(target, 1, {
      top: this.startY, 
      left: this.startX, 
      width: this.startWidth, 
      height: this.startHeight,
      ease: Power3.easeInOut,
      onComplete: ()=> {
        target.removeAttribute("style")
        this.open = false;
      }
    });
  }
}


export default GSAP()(Article)