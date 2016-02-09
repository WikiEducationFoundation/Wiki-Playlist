import Clipboard from 'clipboard';
import ShareJS from '../utils/ShareJS';

import { FACEBOOK_APP_ID } from '../constants';
import Icon from './Icon'
import GSAP from 'react-gsap-enhancer'
import { connect } from 'react-redux';


import {
  closeShare,
  showShare
} from '../actions';

@GSAP()
export class Share extends React.Component {
  constructor() {
    super();
    this.state = {
      copied: false
    }
  }


  render() {
    const { title, caption, server_info } = this.props.Playlist;
    const { id, permalink } = this.props.Playlist.server_info;
    const { copied } = this.state;
    const { share_image_url, share_rendering } = this.props.Share;
    const { protocol, host } = window.location;


    return (
      <div className='sharing__overlay' onClick={this.closeShareOverlay.bind(this)}>
        <div className='sharing__container p2 bg-white card mt2 relative'
             ref={(container) => {this.container = container}}>
             {(share_rendering ? this._shareRendering() : this._sharingButtons())}
        </div>
      </div>
    )
  }

  _shareRendering() {
    return (
      <div className='center p2 flex flex-column flex-center'>
        <div className="loader"/>
        <div>Preparing your playlist...</div>
      </div>
    )
  }

  _viewPermalink() {
    const { copied } = this.state;
    const { id, permalink } = this.props.Playlist.server_info;
    const { title, caption } = this.props.Playlist;
    return (
      <div className='center p2'>
        <p className='mb2'>Please send your Playlist to Wiki Ed. We recommend you also save the link to your Playlist so you can find it again.</p>
        <a href={`mailto:playlist@wikiedu.org?subject=My Wikipedia Playlist:%20${encodeURIComponent(title)}&body=${encodeURIComponent(permalink)}`} 
               className='btn btn-primary mb1 center'>Email Permalink</a>
        <button className='btn btn-outline copy-clipboard' data-clipboard-text={permalink}>
          {(copied ? 'Copied to your clipboard!' : 'Copy Permalink')}
        </button>
      </div>
    )
  }

  _sharingButtons() {
    const { title, caption } = this.props.Playlist;
    const { id, permalink } = this.props.Playlist.server_info;
    const { copied } = this.state;
    const { share_image_url, share_rendering } = this.props.Share;
    const { protocol, host } = window.location;
    return (
        <div>
          <p className='caption mb2'>Share Playlist</p>
          <div className='mb1 border'><img src={share_image_url}/></div>
          <div className='flex flex-justify mb1'>
            <button className='share-button action'
                    data-share-twitter
                    data-share-url={permalink}
                    data-share-text={`This is why I love Wikipedia. #wikiplaylist`}>
              <Icon size="30px" icon="twitter" fill={'twitter'} />
            </button>
            <button className='share-button action'
                    data-share-facebook
                    data-share-url={permalink}>
              <Icon size="30px" icon="facebook" fill={'facebook'} />
            </button>
            <button className='share-button action'
                    data-share-tumblr
                    data-share-posttype='photo'
                    data-share-title={title}
                    data-share-caption={caption}
                    data-share-url={permalink}
                    data-share-content={share_image_url} >
              <Icon size="30px" icon="tumblr" fill={'tumblr'} />
            </button>
            <button className='share-button action'
                    data-share-reddit
                    data-share-url={permalink}>
              <Icon size="30px" icon="reddit" fill={'black'} />
            </button>
            <button className='share-button action'
                    data-share-pinterest
                    data-share-url={permalink}
                    data-share-text={caption}
                    data-share-image={share_image_url}>
              <Icon size="30px" icon="pinterest" fill={'pinterest'} />
            </button>
          </div>
          <div className='flex flex-column py1'>
            <a href={`mailto:?subject=My Wikipedia Playlist:%20${encodeURIComponent(title)}&body=${encodeURIComponent(title)}%0A${encodeURIComponent(permalink)}%0A${encodeURIComponent(caption)}`} 
               className='btn btn-outline mb1 center'>
               Email</a>
            <button className='btn btn-primary copy-clipboard' data-clipboard-text={permalink}>
              {(copied ? 'Copied to your clipboard!' : 'Copy Permalink')}
            </button>
          </div>
          <button className='action close-button' onClick={this.closeShareOverlay.bind(this)}>&#215;</button>
        </div>
    );
  }

  closeShareOverlay({target}) {
    const { share_rendering } = this.props.Share;
    const canClose = share_rendering === false && $(target).hasClass('sharing__overlay') || $(target).hasClass('close-button')
    if(canClose){
      this.props.dispatch(closeShare(true));
    }
    
  }

  componentDidMount() {
    this.open_link = true;
    this.clipboard = new Clipboard('.copy-clipboard');
    this.clipboard.on('success', ()=>{
      this.setState({copied: true}, ()=>{})
    })
    
    this.sharing = new ShareJS({
      onShare: (platform)=>{
        // console.log('sharing on ', platform)
      }
    })

    this.addAnimation(({target})=> {
      return TweenMax.from(target, 0.5, {
        opacity: 0, 
        ease: Power2.easeOut,
        onStart: () => {
          var container = this.container;
          TweenMax.from(container, .5, {
            yPercent: 125,
            ease: Power2.easeOut,
            onStart: ()=>{
              container.style.visibility = 'visible';
            }
          })
        }
      })
    })
  }

  closeShare() {
    this.addAnimation(({target})=> {
      return TweenMax.to(target, 0.5, {
          opacity: 0, 
          ease: Power2.easeOut,
          onStart: () => {
            var container = this.container;
            TweenMax.to(container, .5, {
              yPercent: 125,
              ease: Power2.easeOut,
              onStart: ()=>{
                container.style.visibility = 'visible';
              },
              onComplete: ()=> {
                if(this.props.dispatch !== undefined) {
                  this.props.dispatch(showShare(false));
                } else {
                  this.props.close()
                }
                
              }
            })
          }
      })
    })
  }

  componentWillReceiveProps(props) {
    const { share_rendering } = this.props.Share;
    const { id, permalink } = this.props.Playlist.server_info;
    if(props.Share.close_share) {
      this.closeShare();
    }
  }
}

export default connect( state => {return state})(Share)