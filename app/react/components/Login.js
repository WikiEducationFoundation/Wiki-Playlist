import GSAP from 'react-gsap-enhancer'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  showLogin,
  closeLogin
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

    const wiki_login = (<div><a className='btn btn--oauth wiki' data-popup="Login with Wikipedia Account" href="/users/auth/mediawiki">Sign in with Wikipedia</a></div>);
    return (
      <div className='py3 login-dialogue'>
        <div className='login-dialogue__container bg-white flex flex-column flex-center'
             ref={(container) => {this.container = container}}>
          <div>
            <p>We only access your: </p>
            <ul>
              <li>Username</li>
              <li>Profile Name</li>
              <li>Account Verification</li>
            </ul>
            <div><a className='mb1 btn btn--oauth twitter' data-popup="Login with Twitter" href="/users/auth/twitter">Sign in with Twitter</a></div>
            <div><a className='mb1 btn btn--oauth facebook' data-popup="Login with Facebook" href="/users/auth/facebook">Sign in with Facebook</a></div>
            <button className='action close-button' onClick={()=>{
              this.props.dispatch(closeLogin(true));
            }}>&#215;</button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
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
    if(props.Account.close_login) {
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
}


export default connect( state => {return state})(GSAP()(Login))
