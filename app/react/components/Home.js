import { Link } from 'react-router';
import Icon from './Icon';
export default class Home extends React.Component {
  render() {
    return (
      <div className='py4 center'>
        <Link className='btn btn-primary' to="/playlist">Create a Playlist <Icon size="18px" icon="play-circle" fill={'white'} /></Link>
      </div>
    )
  }
}