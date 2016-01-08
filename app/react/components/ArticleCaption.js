import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import es6BindAll from "es6bindall"; 
class ArticleCaption extends React.Component {
  
  constructor(props) {
    super();

    this.dispatch = props.dispatch;

    es6BindAll(this, [
      '_goToImageSelector',
      '_saveCaption'
    ]);
  }

  render() {
    return (
      <div className='flex flex-column flex-justify'>
        Add Article Caption!
        <div className='flex actions border-top'>
          <button className='btn border-right' onClick={this._goToImageSelector}>Back</button>
          <button className='btn' onClick={this._saveCaption}>Select</button>
        </div>
      </div>)
  }

  _goToImageSelector() {
    this.dispatch(pushPath('/playlist/article/images'));
  }

  _saveCaption() {
    console.log('saveCaption')
    // pushPath('/playlist/article/images')
  }
}

export default connect( state => {return state})(ArticleCaption);