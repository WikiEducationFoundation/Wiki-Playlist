import GSAP from 'react-gsap-enhancer'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Icon from './Icon';
import {
  showLogin,
  closeLogin,
  setPlaylistShouldSave
} from '../actions';

class Login extends React.Component {
  render() {
    const { logged_in } = this.props;
    return (logged_in ? this.loggedIn() : this.loginLinks())
  }

  loggedIn() {
    return <div>You are logged in</div>
  }

  loginLinks() {
    let { dialog } = this.props;
    if(dialog === undefined) {
      dialog = false;
    }
    const copy = (dialog ? null : <div><h3 className='mb1'>Ready to share your playlist?</h3>
            <p>Login to Publish and Share your Playlist</p></div>);
    const loginClass = (dialog ? 'login-dialogue' : 'login-cta');
    const close_button = (dialog ? <button className='action close-button' onClick={()=>{
              this.props.dispatch(closeLogin(true));
            }}>&#215;</button> : null);
    return (
      <div className={loginClass} role="dialog" aria-labelledby="Login to Save Your Playlist" aria-describedby="Login with your facebook, twitter, or wikipedia account.">
        <div className={loginClass + '__container center card px1 py3'} ref={(container) => {this.container = container}}>
          <div>
            {copy}
            <div className='py2 login__buttons'>
              <a onClick={this._handleLoginClick.bind(this)} className='mb1 btn btn--oauth twitter' data-popup="Login with Twitter" href="/users/auth/twitter"><Icon size="17px" icon="twitter" fill={'white'} />Sign in with Twitter</a>
              <a onClick={this._handleLoginClick.bind(this)} className='mb1 btn btn--oauth facebook' data-popup="Login with Facebook" href="/users/auth/facebook"><Icon size="17px" icon="facebook" fill={'white'} />Sign in with Facebook</a>
              <a onClick={this._handleLoginClick.bind(this)} className='btn btn--oauth wiki' data-popup="Login with Wikipedia Account" href="/users/auth/mediawiki"><Icon size="17px" icon="wiki" fill={'white'} />Sign in with Wikipedia</a>
            </div>
            <p className='scorpion px2'><small>We use your username to add an author name to the playlist.</small></p>
            {close_button}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if(this.props.dialog === true) {
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
  }

  componentWillReceiveProps(props) {
    if(props.Account.close_login && this.props.dialog === true) {
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
                  this.props.dispatch(showLogin(false));
                }
              })
            }
        })
      })
    }
  }

  _handleLoginClick() {
    if(this.props.dialog === undefined) {
      this.props.dispatch(setPlaylistShouldSave(true))
    }
  }
}


export default connect( state => {return state})(GSAP()(Login))
