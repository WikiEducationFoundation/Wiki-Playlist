import { Link } from 'react-router';
export default class Login extends React.Component {
  render() {
    return (
      <div>
        <div><a data-popup="Login with Mediawiki Account" href="/users/auth/mediawiki">Sign in with Mediawiki</a></div>
        <div><a data-popup="Login with Twitter" href="/users/auth/twitter">Sign in with Twitter</a></div>
        <div><a data-popup="Login with Facebook" href="/users/auth/facebook">Sign in with Facebook</a></div>
      </div>
    )
  }
}