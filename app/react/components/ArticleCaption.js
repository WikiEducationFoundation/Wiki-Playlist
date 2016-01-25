import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import TextArea from './TextArea';
import { setArticleCaption } from '../actions'
import es6BindAll from "es6bindall";

class ArticleCaption extends React.Component {
  
  constructor(props) {
    super();

    this.dispatch = props.dispatch;
    const { editingArticle, articles } = props.Playlist;
    let caption = '';
    if(articles[editingArticle].caption !== undefined) {
      caption = articles[editingArticle].caption;
    }

    es6BindAll(this, [
      '_goToImageSelector',
      '_saveCaption',
      '_storeCaption'
    ]);

    this.state = {
      caption: caption
    }
  }

  render() {
    return (
      <div className='full-height flex flex-column flex-justify'>
        <div className='article-caption__input p1'>
          <TextArea max={200}
            callback={this._storeCaption}
            value={this.state.caption}
            placeholder='Add a caption'/>
          <div><small className='gray'>Your response will be added to the playlist.</small></div>
        </div>
        <div className='flex actions border-top'>
          <button className='btn border-right' onClick={this._goToImageSelector}>Back</button>
          <button className='btn' onClick={this._saveCaption}>Continue</button>
        </div>
      </div>)
  }

  _goToImageSelector() {
    this.dispatch(pushPath('/playlist/article/images'));
  }

  _saveCaption() {
    const articleIndex = this.props.Playlist.editingArticle;
    this.dispatch(setArticleCaption(articleIndex, this.state.caption))
    this.dispatch(pushPath('/playlist'));
  }

  _storeCaption(caption) {
    this.setState({
      caption: caption
    })
  }
}




export default connect( state => {return state})(ArticleCaption);