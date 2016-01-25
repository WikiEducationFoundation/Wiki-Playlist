import { Link } from 'react-router'
export default class Home extends React.Component {
  render() {
    return (
      <div className='py4 center'>
        <Link className='btn btn-primary' to="/playlist">Create a Playlist</Link>
      </div>
    )
  }
}