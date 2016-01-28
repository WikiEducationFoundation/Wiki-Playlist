import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import { truncateHTML, stripTags } from '../utils/Text';
import OnboardingTitle from './Onboarding/title';
import { 
  updateCurrentEditingArticle,
  updateQuery,
  addArticleCard,
  setPlaylistCaption,
  setPlaylistTitle
} from '../actions';

const TITLE_LIMIT = 40;
const CAPTION_LIMIT = 200;

import Editor from 'react-medium-editor';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';
import es6BindAll from "es6bindall";
import PlaylistTitle from './PlaylistTitle';

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
    const { path } = this.props.routing;
    return (
      <div className='playlist'>
        {(!onboarded && step === 0 || step === 1 ? this._onboardingTitle()  : this._titleCard())}
        {this._articles()}
        {this._addArticle()}
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
    const { dispatch } = this.props;
    const { logged_in, current_user } = this.props.Account;

    let account = null;
    if(logged_in && current_user) {
      account = <span>{current_user.username}</span>;
    }

    const {title, caption, editingCaption } = this.props.Playlist;
    // const captionCharRemaining = CAPTION_LIMIT - stripTags(caption).length;
    // const titleCharRemaining = TITLE_LIMIT - title.length;

   

    // const titleCount = (this.state.titleTyping ? <span 
    //             className='character-limit'
    //             style={{
    //               color: (titleCharRemaining < 1 ? 'red' : 'black')
    //             }}>{(titleCharRemaining)}</span> : null)
    const captionCount = (this.state.captionTyping ? <span 
                className='character-limit'
                style={{
                  color: (captionCharRemaining < 1 ? 'red' : 'green')
                }}>{(captionCharRemaining)}</span> : null);

    return (
      <div>
        <div className="">
          <div className="md-flex flex-justify py2 mb1 md-py4" ref={c => {this.cardContent = c}}>
            <div className={'article-card__header px2 relative'}>
              <PlaylistTitle title={title}/>
              {account}
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
    if(path === '/playlist/article/caption') {
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
          dispatch(pushPath('/playlist/article/caption'));
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
