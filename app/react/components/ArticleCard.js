import GSAP from 'react-gsap-enhancer'
import {
  updateCurrentEditingArticle,
  expandArticle,
  collapseArticle,
  collapseComplete,
  setOnboardingStep,
  setUserOnboarding,
  removeArticle,
  reorderArticleImages
} from '../actions';

import { setOnboardingCookie } from '../actions/UserAPI';

import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import Icon from './Icon';
import es6BindAll from "es6bindall";
import ImageSelector from './ImageSelector';

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
  }

  render() {
    const { has_article, index } = this.props;
    const { onboarded, step } = this.props.Onboarding;
    const isOnboarding = !onboarded && step === 2 && index === 0;
    const onboarding_class = ( isOnboarding ? 'onboarding ' : '')
    const onboarding_back_button = (
          <div><button className='action'
                       onClick={()=>{
                       this.dispatch(setOnboardingStep(1));
                    }}>back</button></div>);
    return (
      <div className={'flex-column flex-stretch ' + onboarding_class + (has_article ? 'article-card' : 'article-card--empty relative editable-container p2 mb2')}>

          {(has_article ?

              <div className='article-card__container' ref={card => {this.cardElement = card}}
                    style={{
                     background: (has_article ?  'white' : '#F0F0F0')
                    }}>
                {this._articleContent()}
              </div>

              :

              <div className='center'>

              {(index > 2 ? <button className='action close-button' onClick={()=>{
                this.dispatch(removeArticle(index));
              }}>&#215;</button>: null)}

              {(isOnboarding ?
                  <div><h3 className='mb3'>Lets add your first Wikipedia Article!</h3>
                  </div>
                : null)}

                  <button className='btn btn-primary flex-end bg-silver'
                      ref={card => {this.cardElement = card}}
                      onClick={() => {
                        this.dispatch(updateCurrentEditingArticle(index))
                        this.dispatch(pushPath('/playlists/article/search'))
                      }}>
                      Add Wikipedia Article</button>
              </div>
          )}

          {(has_article ? null : this.props.children)}
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

    const route = _.compact(path.split('/')).pop();
    if(route === 'playlist' && this.state.editing_options) {
      this.setState({ editing_options: false });
    }
  }

  _articleContent() {
    // const { editing_options } = this.state;
    const { title, description, index, editing, open, has_article, caption, url } = this.props;
    const { editingArticle } = this.props.Playlist;
    const editing_options = editingArticle === index;
    const { onboarded, step } = this.props.Onboarding;
    const isOnboarding = !onboarded && step === 2 && index === 0;
    const truncated_description = (description !== undefined && description.length > 250 ? `${description.substr(0,250)}...` : description)
    let content = null;
    if(has_article) {
      content = (
        <div>
          <h2 className="article-card__title">{title}</h2>
          <div className="mb2 article-card__excerpt summary">{truncated_description}</div>
        </div>
      );
    }

    const edit_button = (
        <button className='btn btn-outline'
                onClick={() => {
                  this.dispatch(reorderArticleImages(index));
                  this.dispatch(updateCurrentEditingArticle(index))
                }}>
                Edit <Icon size="14px" icon="edit" fill={'teal'} /></button>)

    let button = null;
    if(has_article) { button = (
      <div className='flex article-card__controls'>{edit_button}
        <a className='action action--external teal'
           href={url} target='_blank'>
           View Wikipedia Article &nbsp;
           <Icon size="12px" icon="external-link" fill={'teal'} /></a>
        </div>); }


    if(editing_options) {
      button = (
        <div className='flex article-card__controls'>
          <button className='btn btn-outline'
                  ref={card => {this.cardElement = card}}
                  onClick={() => {
                    this.dispatch(updateCurrentEditingArticle(index))
                    this.dispatch(pushPath('/playlists/article/search'))
                  }}>Change Article</button>

          <button className='btn'
                  onClick={() => {
                    this.dispatch(setUserOnboarding(true));
                    setOnboardingCookie();
                    this.dispatch(updateCurrentEditingArticle(null));
                  }}>Save</button>
        </div>);

    }


    return (
      <div className={(has_article ? 'article-card__content' : 'center')} ref={c => {this.cardContent = c}}>
        {(editing_options ? <ImageSelector finishEditing={()=>{this.setState({editing_options: false})}}/> : this._articleImage())}
        <div className={(has_article ? 'article-card__summary relative' : '')}>
          {content}
          <div className=''>
            {button}
          </div>
          {this._imageInfo()}
        </div>
      </div>)
  }

  _imageInfo() {
    const { license, license_url, commons_url, credit, attribution_required } = this.props.image_info;
    return (
      <div className='article-card__image-info'>
        <a href={commons_url} target='_blank'>Image Credit & Info</a>
        &nbsp;&nbsp;
        {(license_url ? <span>License: <a href={license_url} target='_blank'>{license}</a></span> : <span>Image Licence: {license}</span>)}
      </div>
    );
    
  }

  _articleImage() {
    const {index, image, images, open, has_article} = this.props;
    const { editingArticle } = this.props.Playlist;
    const editing_options = editingArticle === index;

    if(this.props.children) {
      return this.props.children;
    }

    if(!has_article) {
      return null;
    }

    let style = {
    }

    let imageClass = '';

    let link = null;
    const link_to_image_selector = (
        <a href='#' className='article-card__image__edit-button btn btn-outline white'
                onClick={this._openImageSelector}>Change Thumbnail</a>
      );

    // Background Image
    if(image !== undefined && image !== '') {
      style.backgroundImage = `url(${image})`
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
    if(this.cardContent === undefined ) {return;}
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
          this.dispatch(pushPath('/playlists/article/search'))
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
    this.setState({editing_options: false})
    this.dispatch(pushPath('/playlists/article/images'));
    this.dispatch(updateCurrentEditingArticle(this.props.index));
  }

}


export default connect( state => {return state})(GSAP()(ArticleCard))
