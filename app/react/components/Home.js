import { Link } from 'react-router'
export default class Home extends React.Component {
  render() {
    return (
      <div>
      Welcome to Wikiplaylist!<br/>
      <Link className='btn btn-primary' to="/playlist">Create a Playlist</Link>
      </div>
    )
  }
}