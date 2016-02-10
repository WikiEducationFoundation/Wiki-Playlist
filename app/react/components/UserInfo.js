import VerifiedBadge from '../utils/VerifiedBadge';

export default class UserInfo extends React.Component {
  render() {
    if(this.props.username === undefined ){ return null; }
    const { verified, provider, avatar, username, className } = this.props;
    const verified_badge = (verified ? <img className='ml1' src={VerifiedBadge(provider)} height={15}/>: null);
    return( 
      <span className='flex flex-center playlist__user-info'>{(avatar ? <img className='avatar' src={avatar}/> : null)}{username}{verified_badge}</span>
    );
  }
}