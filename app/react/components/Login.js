import { Link } from 'react-router';
import { connect } from 'react-redux';

class Login extends React.Component {
  render() {
    const { logged_in } = this.props;
    return (logged_in ? this.loggedIn() : this.loginLinks())
  }

  loggedIn() {
    return <div>You are logged in</div>
  }

  loginLinks() {
    return (
      <div>
        <p>We only access your: </p>
        <ul>
          <li>Username</li>
          <li>Profile Name</li>
          <li>Account Verification</li>
        </ul>
        <div><a className='mb1 btn btn--oauth twitter' data-popup="Login with Twitter" href="/users/auth/twitter">Sign in with Twitter</a></div>
        <div><a className='mb1 btn btn--oauth facebook' data-popup="Login with Facebook" href="/users/auth/facebook">Sign in with Facebook</a></div>
        <div><a className='btn btn--oauth wiki' data-popup="Login with Wikipedia Account" href="/users/auth/mediawiki">Sign in with Mediawiki</a></div>
      </div>
    );
  }
}

export default connect( state => {return state.Account})(Login)