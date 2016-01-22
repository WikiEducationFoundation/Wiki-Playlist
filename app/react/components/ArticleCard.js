import GSAP from 'react-gsap-enhancer'
import { updateCurrentEditingArticle, expandArticle, collapseArticle, collapseComplete } from '../actions';
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import es6BindAll from "es6bindall"; 
import Icon from './Icon';

export class ArticleCard extends React.Component {

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
      editing_options: false
    }
  }

  render() {
    const { has_article } = this.props;
    return (
      <div className={'flex-column flex-stretch ' + (has_article ? 'article-card' : 'editable-container p2 mb2')}>
        <div className={' ' + (has_article ? 'article-card__container' : '')} ref={card => {this.cardElement = card}}>
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
    if(nextProps.routing === undefined) { return; }
    const {path} = nextProps.routing;
    const {index, Playlist, open} = this.props;


    if(nextProps.open && !open && !this.animating) {
      this.expandController = this.addAnimation(this._expand);
    } else if(!nextProps.open && open && !this.animating) {
      this.collapseController = this.addAnimation(this._collapse);
    } else if (!nextProps.open && !open) {
      this.cardElement.removeAttribute('style')
    }

    if(nextProps.Playlist.all_collapsed && this.controller !== undefined) {
      
      // this.controller.kill()
    }

    const route = _.compact(path.split('/')).pop();
    if(route === 'playlist' && this.state.editing_options) {
      this.setState({ editing_options: false });
    }
  }

  _articleContent() {
    const { editing_options } = this.state;
    const { title, description, index, editing, open, has_article, caption, url } = this.props;
    const truncated_description = (description !== undefined && description.length > 250 ? `${description.substr(0,250)}...` : description)
    const article_link = (!_.isEmpty(url) ? <a className='px1' href={url}>Read Article</a> : null)
    let content = null;
    if(has_article) {
      content = (
        <div>
          <h2 className="article-card__title">{title}</h2>
          <div className="mb2 article-card__excerpt summary"><small>{truncated_description}{article_link}</small></div>
        </div>
      );
    }

    const search_button = (<button className='btn btn-outline flex-end bg-silver'
              onClick={() => {this.dispatch(expandArticle(index))}}>Add Article</button>);
    
    const edit_button = (<button className='action' 
              onClick={() => { this.setState({editing_options: true})}}>Edit <Icon size="16px" icon="edit" fill={'silver'} /></button>)

    let button = search_button;
    if(has_article) { button = (
      <span>{edit_button}
        <a className='action action--external-serif' href={url}>View Article <Icon size="12px" icon="external-link" fill={'teal'} /></a></span>); }
    
    if(editing_options) { 
      button = null; 
      content = (
        <button className='btn btn--edit'
                onClick={() => {this.dispatch(expandArticle(index))}}>Change Article</button>
      )

    }


    if(editing !== index) {
      return (
        <div className={(has_article ? 'article-card__content' : 'center')} ref={c => {this.cardContent = c}}>
          {this._articleImage()}
          <div className={(has_article ? 'article-card__summary' : '')}>
            {content}
            <div className=''>
              {button}
            </div>
          </div>
        </div>)
    } else {
      return null;
    }
  }

  _articleImage() {
    const { editing_options } = this.state;
    const {image, images, open, has_article} = this.props;

    if(!has_article) {
      return null;
    }

    let style = {
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

    const cancel_button = (
        <button className='article-card__cancel-button'
                onClick={()=>{this.setState({editing_options: false})}}>&#215;</button>)

    let cancel = null;
    if(editing_options) {
      cancel = cancel_button;
    }

    if(editing_options && images.length > 1) {
      link = link_to_image_selector;
      imageClass += 'editing ';
    }

    if(this.props.Playlist.animating && open) {
      imageClass += 'hidden ';
    }

    return (<div className={'article-card__image ' + imageClass} style={style}>{link}{cancel}</div>)
  }

  _hideContent(callback = null) {
    this.addAnimation(() =>{
      return TweenMax.to(this.cardContent, 1,  
        {opacity: 0, ease: Power3.easeOut, onComplete: callback})
    });
    
  }

  _expand({}) {
    this.animating = true;
    const target = this.cardElement;
    const {top, left, height, width} = target.getBoundingClientRect();
    this.startY = top;
    this.startX = left;
    this.startWidth = width;
    this.startHeight = height;

    return TweenMax.fromTo(target, 1,
      {
        position: 'fixed',
        top: this.startY, 
        left: this.startX,
        width: this.startWidth, 
        height: this.startHeight,
        zIndex: 20,
      },
      {
        position: 'fixed',
        top: 0, 
        left: 0,
        width: window.innerWidth, 
        height: window.innerHeight,
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
      }
    )

  }

  _collapse({target}) {
    this.animating = true;
    var card = this.cardElement;
    return TweenMax.fromTo(card, 1,
        {
          position: 'fixed',
          top: 0, 
          left: 0,
          width: window.innerWidth, 
          height: window.innerHeight,
          zIndex: 20
        },
        {
          position: 'fixed',
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
            this.collapseController.kill()
            this.expandController.kill()
            this.dispatch(collapseComplete())
            this.setState({open: false}, ()=> {
              this.animating = false;
            })
          }
        })
  }

  _openImageSelector() {
    this.dispatch(pushPath('/playlist/article/images'));
    this.dispatch(updateCurrentEditingArticle(this.props.index));
  }

}


export default connect( state => {return state})(GSAP()(ArticleCard))