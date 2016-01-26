import { connect } from 'react-redux';
import { 
  showShare
} from '../actions';

class ShareButton extends React.Component {
  render() {
    const { ready, dispatch } = this.props;
    const button = (
      <button className='btn btn-outline'
              onClick={()=>{
                dispatch(showShare(true));
              }}>Share</button>);

    return (ready ? button : null);
  }
}

export default connect( state => {return state.Share} )(ShareButton)