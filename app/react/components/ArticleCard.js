import GSAP from 'react-gsap-enhancer'
import { updateCurrentEditingArticle, expandArticle, collapseArticle } from '../actions';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import es6BindAll from "es6bindall"; 

class ArticleCard extends React.Component {

  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    es6BindAll(this,['_expand', '_collapse'])
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div className="article-card flex-column flex-stretch">
        <div className="article-card__container border flex flex-column flex-stretch" ref={card => {this.cardElement = card}}>
          {this._articleContent()}
          {this.props.children}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.alive = true;
  }

  componentWillUnmount() {
    this.alive = false;
    console.log('article card unmounting')
    if(this.controller !== undefined) {
      this.controller.kill()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {path} = nextProps.routing;
    const {index, Playlist, open} = this.props;
    if(nextProps.open && !this.state.open) {
      this.constroller = this.addAnimation(this._expand);
    } else if(!nextProps.open && this.state.open) {
      this.controller = this.addAnimation(this._collapse);
    }
  }

  _articleContent() {
    const {title, index, editing, open, has_article} = this.props;
    let content = null;
    if(has_article) {
      content = (
        <div>
          <h2 className="m0">{title}</h2>
        </div>
      );
    }

    if(editing !== index) {
      return (
        <div className="article-card__content flex flex-grow flex-column flex-stretch" ref={c => {this.cardContent = c}}>
          {this._articleImage()}
          <div className='flex flex-column flex-center article-card__summary'>
            {content}
            <button className='btn btn-outline bg-silver flex-end' 
                  onClick={() => {this.dispatch(expandArticle(index))}}>
                  Add Article</button>
          </div>
        </div>)
    } else {
      return null;
    }
  }

  _articleImage() {
    const {image} = this.props;
    let style = {
      backgroundColor: '#aaa',
      height: '200px'
    }
    if(image !== '') {
      style.backgroundImage = `url(${image})`
    }
    return <div className='article-card__image' style={style}/>
  }


  _expand() {
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
      width: this.startWidth,
      height: this.startHeight,
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
          {opacity: 0, y: -100, ease: Power3.easeOut})
      },
      onComplete: () => {
        this.setState({open: true});
        this.dispatch(updateCurrentEditingArticle(this.props.index));
        this.dispatch(pushPath('/playlist/article/search'))
      }
    })
  }

  _collapse() {
    console.log('card collapsing')
    const target = this.cardElement;
    return TweenMax.to(target, 1, {
      top: this.startY, 
      left: this.startX, 
      width: this.startWidth, 
      height: this.startHeight,
      zIndex: 1,
      ease: Power3.easeInOut,
      onStart: () => {
        this.dispatch(collapseArticle(this.props.index));
        TweenMax.to(this.cardContent, 1,  
          {opacity: 1, y: 0, ease: Power3.easeOut})
        
      },
      onComplete: () => {
        if(this.alive) {
          this.setState({open: false})
          target.style.position = 'static';
        }
      }
    })
  }
}

export default connect( state => {return state})(GSAP()(ArticleCard))