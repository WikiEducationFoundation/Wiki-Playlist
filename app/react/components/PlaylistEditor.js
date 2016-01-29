import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import { truncateHTML, stripTags } from '../utils/Text';
import OnboardingTitle from './Onboarding/title';
import { 
  updateCurrentEditingArticle,
  updateQuery,
  addArticleCard,
  setPlaylistCaption,
  setPlaylistTitle,
  updatePlaylistUsername,
  updatePlaylistCaption
} from '../actions';

import { TITLE_LIMIT, CAPTION_LIMIT } from '../constants';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';
import es6BindAll from "es6bindall";
import EditableText from './EditableText';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';
import PlaylistBackgroundColor from './PlaylistBackgroundColor';
import ColorPicker from './ColorPicker';

class PlaylistEditor extends React.Component {

  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    es6BindAll(this, [
      '_onboardingTitle'
    ]);

    this.state = {
      titleLimitHit: false,
      captionLimitHit: false,
      titleTyping: false,
      captionTyping: false
    };
  }

  render() {
    const { onboarded, step } = this.props.Onboarding;
    const { color } = this.props.Playlist;
    const { path } = this.props.routing;
    return (
      <div className='playlist relative'>
        <div className='container playlist__container relative'>
          {(!onboarded && step === 0 || step === 1 ? this._onboardingTitle()  : this._titleCard())}
          {this._articles()}
          {this._addArticle()}
          <div className='center py2'><SaveButton /></div>
          {( onboarded ? <ColorPicker /> : null )}
          <DeleteButton />
        </div>
        
        <PlaylistBackgroundColor color={color}/>
        
        { onboarded ? null : <div className='onboarding__screen'></div>}
      </div>
    )
  }

  _articles() {

    const {articles, editingArticle} = this.props.Playlist;
    let _articles = [];
    articles.map((article, i) =>{
      _articles.push(
        <ArticleCard index={i}
            key={`article_${i}`}
            dispatch={this.props.dispatch}
            editing={editingArticle}
            {...article}>
            {(editingArticle === i ? this.props.children : null)}</ArticleCard>)
    })
    return _articles;
  }

  _titleCard() {
    const { color } = this.props.Playlist;
    const { dispatch } = this.props;
    const { logged_in, current_user } = this.props.Account;
    const signed_in = logged_in && current_user;

    const {title, caption, editingCaption, username } = this.props.Playlist;

    return (
      <div>
        <div className="">
          <div className="py2 mb1 md-py4" ref={c => {this.cardContent = c}}>
            <div className={'article-card__header px2 relative md-flex flex-justify'}>
              <div>
                <p>{username}</p>
                
                <EditableText
                    value={title}
                    color={color}
                    placeholder={'Your Playlist Title'}
                    limit={TITLE_LIMIT}
                    className='h1 '
                    save={(title)=>{this.dispatch(setPlaylistTitle(title))}}>
                    <h1>{title}</h1>
                    </EditableText> 
              </div>

              <div className='playlist__caption'>
                <EditableText
                    color={color}
                    value={caption}
                    placeholder={'Add a caption to your playlist'}
                    limit={CAPTION_LIMIT}
                    className=' '
                    save={(caption)=>{this.dispatch(setPlaylistCaption(caption))}}>
                    <p>{caption}</p>
                    </EditableText> 
                </div>
            </div>
            
          </div>
        </div>
      </div>)
  }

  _onboardingTitle() {
    return <OnboardingTitle />
  }

  _addArticle() {
    const {articles} = this.props.Playlist;
    if(articles.length < 5) {
      return (
      <div className="editable-container center p2">
          <button className='action teal'
                    onClick={()=>{this.props.dispatch(addArticleCard())}}>Add Article +</button>
      </div>)
    } else {
      return null;
    }
  }

  _captions() {
    // Don't display captions if currently editing one
    const { path } = this.props.routing;
    if(path === '/playlists/article/caption') {
      return null
    }

    const { dispatch } = this.props;
    const { articles } = this.props.Playlist;
    return articles.map((article, i) => {
      let caption = null;
      let edit_button = null;
      if(article.caption !== undefined && !_.isEmpty(article.caption) ) {
        caption = article.caption;
        edit_button = (<a href='#' className='gray' onClick={()=> {
          dispatch(updateCurrentEditingArticle(i));
          dispatch(pushPath('/playlists/article/caption'));
        }}>Edit Caption</a>)
      }
      return (
        <div key={`article_caption_${i}`} className='article-card__caption p2'>
          {caption} {edit_button}
        </div>
      )
    })
  }

  
}

export default connect( state => {return state})(PlaylistEditor);
