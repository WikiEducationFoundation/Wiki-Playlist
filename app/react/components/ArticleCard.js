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

    es6BindAll(this, [
        '_expand', 
        '_collapse',
        '_openImageSelector', 
        '_hideContent'
      ]);

    this.state = {
      open: false,
      editing_options: false
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
      this.controller = this.addAnimation(this._expand);
    } else if(!nextProps.open && this.state.open && !this.animating) {
      this.controller = this.addAnimation(this._collapse);
    }

    const route = _.compact(path.split('/')).pop();
    if(route === 'playlist' && this.state.editing_options) {
      this.setState({ editing_options: false });
    }
  }

  _articleContent() {
    const { editing_options } = this.state;
    const { title, description, index, editing, open, has_article, caption } = this.props;
    const truncated_description = (description.length > 150 ? `${description.substr(0,150)}...` : description)

    let content = null;
    if(has_article) {
      content = (
        <div>
          <h2 className="m0">{title}</h2>
          <div className="px1 mb2 article-card__excerpt"><small>{truncated_description}</small></div>
        </div>
      );
    }

    const search_button = (<button className='btn btn-outline flex-end bg-silver'
              onClick={() => {this.dispatch(expandArticle(index))}}>Add Article</button>);
    
    const edit_button = (
      <button className='article-card__edit-button btn btn-outline' 
              onClick={() => { this.setState({editing_options: true})}}>Edit</button>)

    let button = search_button;
    if(has_article) { button = edit_button; }
    
    if(editing_options) { 
      button = null; 
      content = (
        <button className='btn btn-outline'
              onClick={() => {this.dispatch(expandArticle(index))}}>Change Article</button>
      )

    }


    if(editing !== index) {
      return (
        <div className="article-card__content flex flex-grow flex-column flex-stretch" ref={c => {this.cardContent = c}}>
          {this._articleImage()}
          <div className='flex flex-column flex-center article-card__summary'>
            {content}
            {button}
          </div>
        </div>)
    } else {
      return null;
    }
  }

  _articleImage() {
    const { editing_options } = this.state;
    const {image, images} = this.props;

    let style = {
      height: '200px'
    }

    let imageClass = '';

    // Change Thumbnail LInk
    let link = null;
    const link_to_image_selector = (
        <a href='#' className='article-card__image__edit-button btn btn-outline white' 
                onClick={this._openImageSelector}>Change Thumbnail</a>
      );

    // Background Image
    if(image !== undefined && image !== '') {
      style.backgroundImage = `url(${image.url})`
    } else if (images.length) {
      style.backgroundImage = `url(${images[0].url})`;
    }

    let cancel = null;
    if(editing_options) {
      link = link_to_image_selector;
      imageClass += 'editing ';
      cancel = (
        <button className='article-card__cancel-button'
                onClick={()=>{this.setState({editing_options: false})}}>&#215;</button>)
    }

    return (<div className={'article-card__image ' + imageClass} style={style}>{link}{cancel}</div>)
  }

  _hideContent(callback = null) {
    this.addAnimation(() =>{
      return TweenMax.to(this.cardContent, 1,  
        {opacity: 0, ease: Power3.easeOut, onComplete: callback})
    });
    
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
        this._hideContent();
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

  _openImageSelector() {
    this.dispatch(pushPath('/playlist/article/images'));
    this.dispatch(updateCurrentEditingArticle(this.props.index));
  }

}

export default connect( state => {return state})(GSAP()(ArticleCard))