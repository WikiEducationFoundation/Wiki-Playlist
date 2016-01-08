import GSAP from 'react-gsap-enhancer'
import { updateCurrentEditingArticle, expandArticle, collapseArticle } from '../actions';
import { Link } from 'react-router';
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
    if(nextProps.open && !this.state.open && !this.animating) {
      this.constroller = this.addAnimation(this._expand);
    } else if(!nextProps.open && this.state.open && !this.animating) {
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

    let add_button = null;
    const search_button_text = (has_article ? 'Change Article' : 'Add Article')
    const search_button_class = (has_article ? '' : 'bg-silver')
    let search_button = (
      <button className={`btn btn-outline flex-end ${search_button_class}`} 
                  onClick={() => {this.dispatch(expandArticle(index))}}>
                  {search_button_text}</button>);

    if(editing !== index) {
      return (
        <div className="article-card__content flex flex-grow flex-column flex-stretch" ref={c => {this.cardContent = c}}>
          {this._articleImage()}
          <div className='flex flex-column flex-center article-card__summary'>
            {content}
            {search_button}
          </div>
        </div>)
    } else {
      return null;
    }
  }

  _articleImage() {
    const {image, images} = this.props;
    let style = {
      backgroundColor: '#aaa',
      height: '200px'
    }
    let link_to_image_selector = null;
    if(image !== undefined && image !== '') {
      style.backgroundImage = `url(${image})`
    } else if (images.length) {
      style.backgroundImage = `url(${images[0]})`;
      // link_to_image_selector = (
      //   <Link to='/playlist/article/images'>Choose Image</Link>
      // );
    }

    return (<div className='article-card__image' style={style}>{link_to_image_selector}</div>)
  }


  _expand() {
    this.animating = true;
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
          {opacity: 0, ease: Power3.easeOut})
      },
      onComplete: () => {
        this.setState({open: true});
        this.dispatch(updateCurrentEditingArticle(this.props.index));
        this.dispatch(pushPath('/playlist/article/search'))
        this.animating = false;
      }
    })
  }

  _collapse({target}) {
    this.animating = true;
    const card = this.cardElement;

    return TweenMax.to(card, 1, {
      top: this.startY, 
      left: this.startX, 
      width: this.startWidth, 
      height: this.startHeight,
      zIndex: 1,
      ease: Power3.easeInOut,
      onStart: () => {
        this.dispatch(collapseArticle(this.props.index));
      },
      onComplete: () => {
        if(this.alive) {
          this.setState({open: false}, ()=> {
            this.animating = false;
            card.removeAttribute('style')
          })
          
        }
        
      }
    })
  }
}

export default connect( state => {return state})(GSAP()(ArticleCard))