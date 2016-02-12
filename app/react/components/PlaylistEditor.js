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
  updatePlaylistCaption,
  resetPlaylist
} from '../actions';

import { TITLE_LIMIT, CAPTION_LIMIT, MAX_ARTICLES } from '../constants';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';
import es6BindAll from "es6bindall";
import EditableText from './EditableText';
import SaveButton from './SaveButton';
import PlaylistBackgroundColor from './PlaylistBackgroundColor';
import ColorPicker from './ColorPicker';
import Login from './Login';
import Playlist from './Playlist';
import UserInfo from './UserInfo';

class PlaylistEditor extends React.Component {

  constructor(props) {
    super();
    this.articles = [];
    this.scrolling = false;
    this.dispatch = props.dispatch;
    es6BindAll(this, [
      '_onboardingTitle'
    ]);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    const { logged_in, current_user } = this.props.Account;
    const { onboarded, step } = this.props.Onboarding;
    const { color, published, articles, server_info, show_permalink } = this.props.Playlist;
    const { share_image_url } = this.props.Share;
    const { path } = this.props.routing;
    const onboarding = !onboarded && step === 0 || !onboarded && step === 1;
    if(show_permalink) {
      return this._permalink();
    }



    return (
      <div className={'playlist relative ' + (onboarding ? 'onboarding' : '')}>
        <div className='container playlist__container relative'>
          {( onboarding ? this._onboardingTitle()  : this._titleCard())}
          {this._articles()}
          {this._addArticle()}
          {( onboarded ? <ColorPicker /> : null )}
          
          {(logged_in ? <div className='p2 center mt1'><SaveButton/></div> : <Login/>)}

        </div>

        <PlaylistBackgroundColor color={color}/>

        { onboarded ? null : <div className='onboarding__screen'></div>}

      </div>
    )
  }

  _permalink() {
    let playlist = this.props.Playlist.permalink;
    playlist.id = playlist.server_info.id;
    const articles = _.where(playlist.articles, {has_article: true});
    const { current_user } = this.props.Account;
    const permalink = playlist.server_info;
    const { share_image_url } = this.props.Share;

    return (
      <Playlist content_only={true} 
                playlist={playlist} 
                articles={articles} 
                user={current_user} 
                share_image_url={share_image_url}
                permalink={playlist.server_info.permalink}/>);
  }

  _articles() {
    const { editingArticle } = this.props.Playlist;

    let _articles = [];

    let articles = (arguments[0] === undefined ? this.props.Playlist.articles : arguments[0])

    articles.map((article, i) =>{
      _articles.push(
        <ArticleCard index={i}
            ref={article => this.articles.push(article)}
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
          <div className="py3 md-mb1 md-mt5" ref={c => {this.cardContent = c}}>

            <div className={'article-card__header px2 relative'}>
              <div><UserInfo {...current_user} link={true} /></div>
              <div className='md-flex flex-justify'>
                <div className='playlist__title'>
                  <EditableText
                      value={title}
                      color={color}
                      placeholder={'Add Playlist Title'}
                      limit={TITLE_LIMIT}
                      className='h1 inline-block'
                      save={(title)=>{this.dispatch(setPlaylistTitle(title))}}>
                      <h1 className='inline-block'>{title}</h1>
                      </EditableText>
                </div>

                <div className='playlist__caption'>
                  <EditableText
                      color={color}
                      value={caption}
                      placeholder={'Add a caption to your Playlist'}
                      limit={CAPTION_LIMIT}
                      className=' '
                      save={(caption)=>{this.dispatch(setPlaylistCaption(caption))}}>
                      <p>{caption}</p>
                      </EditableText>
                  </div>
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
    if(articles.length < MAX_ARTICLES) {
      return (
      <div className="editable-container center p2">
          <button className='action teal'
                    onClick={()=>{this.props.dispatch(addArticleCard())}}>Add Wikipedia Article +</button>
      </div>)
    } else {
      return null;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onboarded } = nextProps.Onboarding;
    const { editingArticle, articles } = nextProps.Playlist;
    const nextArticleIndex = _.where(articles, {has_article: true}).length;
    var $target = $(`#article-${nextArticleIndex}`)
    if(editingArticle === null &&
       !this.scrolling &&
       nextArticleIndex > 0 &&
       onboarded &&
       $target !== undefined) {
      this.scrolling = true;
      $('html, body').animate({
          scrollTop: $target.offset().top - 100
      }, 1000);
      this.scrolling = false;
    }
  }

  componentWillUnmount() {
    if(this.props.Playlist.show_permalink) {
      this.dispatch(resetPlaylist());
    }
  }

}

export default connect( state => {return state})(PlaylistEditor);
