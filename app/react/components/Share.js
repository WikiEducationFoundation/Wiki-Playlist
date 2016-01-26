import Clipboard from 'clipboard';
import ShareJS from 'share-js';

import { FACEBOOK_APP_ID } from '../constants';
import Icon from './Icon'
import GSAP from 'react-gsap-enhancer'
import { connect } from 'react-redux';


import {
  closeShare,
  showShare
} from '../actions';

class Share extends React.Component {
  constructor() {
    super();
    this.state = {
      copied: false
    }
  }
  render() {
    const { title, caption } = this.props.Playlist;
    const { id } = this.props.Playlist.server_info;
    const { copied } = this.state;
    const { share_image_url } = this.props.Share;
    const { protocol, host } = window.location;
    const permalink = protocol + '//' + host + '/' + id;

    return (
      <div className='sharing__overlay' onClick={this.closeShare.bind(this)}>
        <div className='sharing__container p2 bg-white card mt2 relative'
             ref={(container) => {this.container = container}}>
          <p className='caption mb2'>Share Playlist</p>
          <div className='flex flex-justify mb1'>
            <button className='share-button action'
                    data-share-twitter
                    data-share-url={permalink}
                    data-share-text={title}>
              <Icon size="30px" icon="twitter" fill={'twitter'} />
            </button>
            <button className='share-button action'
                    data-share-facebook
                    data-share-url={permalink}>
              <Icon size="30px" icon="facebook" fill={'facebook'} />
            </button>
            <button className='share-button action'
                    data-share-tumblr
                    data-share-url={permalink}
                    data-share-image={share_image_url}>
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
            <button className='btn btn-outline mb1'>Email</button>
            <button className='btn btn-primary copy-clipboard' data-clipboard-text={permalink}>
              {(copied ? 'Copied to your clipboard!' : 'Copy Permalink')}
            </button>
          </div>
          <button className='action close-button' onClick={this.closeShare.bind(this)}>&#215;</button>
        </div>
      </div>
    );
  }

  closeShare({target}) {
    const canClose = $(target).hasClass('sharing__overlay') || $(target).hasClass('close-button')
    if(canClose){
      this.props.dispatch(closeShare(true));
    }
    
  }

  componentDidMount() {
    this.clipboard = new Clipboard('.copy-clipboard');
    this.clipboard.on('success', ()=>{
      this.setState({copied: true}, ()=>{})
    })
    
    this.sharing = new ShareJS({
      onShare: (platform)=>{
        console.log('sharing on ', platform)
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

  componentWillReceiveProps(props) {
    if(props.Share.close_share) {
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
                onComplete: ()=>{
                  this.props.dispatch(showShare(false));
                }
              })
            }
        })
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.copyTimeout);
  }
}

export default connect( state => {return state})(GSAP()(Share))