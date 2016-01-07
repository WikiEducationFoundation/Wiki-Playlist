import GSAP from 'react-gsap-enhancer'
import { updateCurrentEditingArticle } from '../actions';
import { pushPath } from 'redux-simple-router';


class ArticleCard extends React.Component {

  constructor(props) {
    super();
    this.dispatch = props.dispatch;
  }

  render() {
    
    return (
      <div className="border-bottom article-card">
        <div className="article-card__container" ref={card => {this.cardElement = card}}>
          
          {this.articleContent()}

          {this.props.children}
        </div>
      </div>
    )
  }

  articleContent() {
    const {title, index, editing} = this.props;
    if(editing === null) {
      return (
        <div className="article-card__content" ref={c => {this.cardContent = c}}>
          <h2 className="m0">{title}</h2>
          <button className='btn' onClick={this.handleClick.bind(this)}>Find an Article</button>
        </div>)
    } else {
      return null;
    }
  }

  handleClick() {
    const {index} = this.props;
    this.addAnimation(this.expand.bind(this));
  }

  expand() {
    const target = this.cardElement;
    const {top, left, height, width} = target.getBoundingClientRect();
    this.startY = top;
    this.startX = left;
    this.startWidth = width;
    this.startHeight = height;

    TweenMax.set(target, {
      position: 'fixed',
      top: this.startY, 
      left: this.startX,
      zIndex: 20
    })

    return TweenMax.to(target, 1, {
      top: 0, 
      left: 0, 
      position: 'fixed',
      width: '100%', 
      height: '100%',
      zIndex: 20,
      ease: Power3.easeInOut,
      onStart: () => {
        TweenMax.to(this.cardContent, 1,  
          {opacity: 0, ease: Power3.easeOut})
      },
      onComplete: () => {
        this.dispatch(updateCurrentEditingArticle(this.props.index));
        this.dispatch(pushPath('/playlist/new/article'))
      }
    })
  }
}


export default GSAP()(ArticleCard)