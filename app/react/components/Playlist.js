import { ArticleCard } from './ArticleCard';
import { connect } from 'react-redux';
import { truncateHTML, stripTags } from '../utils/Text';

import Icon from './Icon';
import { TITLE_LIMIT, CAPTION_LIMIT, MD, MDINT, MINIMUM_ARTICLES } from '../constants';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';
import es6BindAll from "es6bindall";
import EditableText from './EditableText';
import SaveButton from './SaveButton';
import PlaylistBackgroundColor from './PlaylistBackgroundColor';
import ColorPicker from './ColorPicker';
import Login from './Login';
import {addSupportClasses} from '../utils/CSSSupportClasses';
import { Share } from './Share';
import GSAP from 'react-gsap-enhancer'
import MediaQuery from 'react-responsive';


export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      share_share: false
    }
  }

  render() {
    const { show_share } = this.state;
    let { playlist, articles, user, share_image_url, permalink } = this.props;
    playlist.articles = articles;
    playlist.server_info = {
      id: playlist.id,
      permalink: permalink
    }
    const share = {
      share_rendering: false,
      share_image_url: share_image_url
    }

    const { color } = this.props.playlist;

    return (
      <div className={this.supportClasses}>
        <nav className="md-py2 site__navigation">
          <div className='container flex flex-center flex-justify'>
            <a href="/" className='black'>
              <img className='logo__image' src='/images/wikiedu-logo.svg' height='30'/>
              <img className='logo__text' src='/images/wiki-playlist-type.svg' height='20'/>
            </a>
            <a href='/playlist' className='btn btn-primary'>Create your own Playlist</a>
          </div>
        </nav>

        <div className='site__content'>
          <div className='playlist relative'>
            <div className='container playlist__container relative'>
              {this._titleCard()}
              {this._articles()}
            </div>
            <PlaylistBackgroundColor color={color}/>
          </div>
          <div className='center playlist__ctas'>
            <a href='/playlist' className='btn btn-primary'>Create your own Playlist</a>
            <button className='btn btn-primary' onClick={()=>{
                this.setState({show_share: true})
              }}>Share this Playlist</button>
          </div>
        </div>

        <footer className='site__footer container mt3 center flex-justify border-top'>
          <div className="py2 px1">
            <small>Wiki Playlist is a project of the <a href='http://wikiedu.org/'>Wiki Education Foundation</a>, and subject to Wiki Ed&#39;s <a href='https://wikiedu.org/terms-of-service/'>Terms of Service</a> and <a href='https://wikiedu.org/privacy-policy/'>Privacy Policy</a>. Text and images on Wikipedia articles are available under free licenses thanks to the tireless work of volunteers at Wikipedia and Wikimedia Commons.</small></div>
          <div className='py2'></div>
        </footer>

        {(show_share ? <Share Playlist={playlist} Share={share} close={()=>{
          this.setState({show_share: false})
        }}/> : null )}  
        
      </div>

      
    )
  }

  _articles() {
    const { articles } = this.props;
    return articles.map((article, i) =>{
      
        const { id, title, url, description, image, commons_url, image_license_url, image_license } = article;
        let style =  {
          backgroundImage:`url(${image})`
        }

        const limit = (window.innerWidth < MDINT ? 120 : 250)
        const truncated_description = (description !== undefined && description.length > limit ? <span>{`${description.substr(0,limit)}...`}</span> : description)
        return (
            <div className='flex-column flex-stretch article-card' key={id + i + (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4)}>
            <div className='article-card__container' ref={card => {this.cardElement = card}}
                  style={{
                   background: 'white'
                  }}>
              <div className='article-card__content'>
                <div className={'article-card__image '} style={style}></div>
                <div className='article-card__summary relative'>
                  <h2 className="article-card__title"><a href={url}>{title}</a></h2>
                  <div className="mb2 article-card__excerpt summary">
                    {truncated_description}
                  </div>
                  <div className='md-flex flex-justify'>
                  <div className='article-card__image-info'>
                    {(commons_url ? <span><a href={commons_url} target='_blank'>Image Credit & Info</a>&nbsp;&nbsp;</span> : null )}
                    {(image_license && image_license_url ? <span>License: <a href={image_license_url} target='_blank'>{image_license}</a></span> : null)}
                  </div>
                  <div><a className='action action--external teal'
                     href={url} target='_blank'>
                     View Wikipedia Article &nbsp;
                     <Icon size="12px" icon="external-link" fill={'teal'} /></a></div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        )
    })
  }

  _titleCard() {
    const { color } = this.props.playlist;
    const { dispatch } = this.props;
    const {title, caption, editingCaption } = this.props.playlist;
    const { username, avatar, name, provider, verified } = this.props.user;
    const verified_badge = (verified && provider === 'twitter' ? <img className='ml1' src='/images/verified.png' height={15}/>: null);
    return (
      <div>
        <div className="">
          <div className="py3 md-mb1 md-mt5" ref={c => {this.cardContent = c}}>

            <div className={'article-card__header px2 relative'}>
              <p className='flex flex-center playlist__user'>{(avatar ? <img className='avatar' src={avatar}/> : null)}{username}{verified_badge}</p>
              <div className='md-flex flex-justify'>
                <div className='playlist__title'>
                  <h1>{title}</h1>
                </div>
                <div className='playlist__caption'>
                  <p>{caption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
  _addArticle() {
    const {articles} = this.props.playlist;
    if(articles.length < 5) {
      return (
      <div className="editable-container center p2">
          <button className='action teal'
                    onClick={()=>{this.props.dispatch(addArticleCard())}}>Add Wikipedia Article +</button>
      </div>)
    } else {
      return null;
    }
  }

  _captions() {
    // Don't display captions if currently editing one
    const { path } = this.props.routing;
    if(path === '/playlists/article/caption') {
      return null
    }

    const { dispatch } = this.props;
    const { articles } = this.props.playlist;
    return articles.map((article, i) => {
      let caption = null;
      let edit_button = null;
      if(article.caption !== undefined && !_.isEmpty(article.caption) ) {
        caption = article.caption;
        edit_button = (<a href='#' className='gray' onClick={()=> {
          dispatch(updateCurrentEditingArticle(i));
          dispatch(pushPath('/playlists/article/caption'));
        }}>Edit Caption</a>)
      }
      return (
        <div key={`article_caption_${i}`} className='article-card__caption p2'>
          {caption} {edit_button}
        </div>
      )
    })
  }
}
