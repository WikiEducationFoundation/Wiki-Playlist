import VerifiedBadge from '../utils/VerifiedBadge';

function userLink(user) {
  const { verified, provider, avatar, username, className, uid } = user;
  switch(provider) {
    case 'facebook':
      return 'https://www.facebook.com/' + uid
      break;
    case 'twitter':
      return 'https://twitter.com/' + username
      break;
    case 'mediawiki':
      return 'https://commons.wikimedia.org/wiki/User:' + username
      break;
  }
}

export default class UserInfo extends React.Component {
  render() {
    if(this.props.username === undefined ){ return null; }
    const { verified, provider, avatar, username, className, link } = this.props;
    const verified_badge = (verified ? <img className='ml1' src={VerifiedBadge(provider)} height={15}/>: null);
    if(link !== undefined && link) {
      return( 
        <a href={userLink(this.props)} target='_blank' className='flex flex-center playlist__user-info'>{(avatar ? <img className='avatar' src={avatar}/> : null)}{username}{verified_badge}</a>
      );
    } else {
      return( 
        <span className='flex flex-center playlist__user-info'>{(avatar ? <img className='avatar' src={avatar}/> : null)}{username}{verified_badge}</span>
      );
    }
    
  }
}