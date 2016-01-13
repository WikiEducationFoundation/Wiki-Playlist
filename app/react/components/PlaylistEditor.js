import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import { updateCurrentEditingArticle, updateQuery, addArticleCard, editingPlaylistCaption } from '../actions';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';

class PlaylistEditor extends React.Component {

  render() {
    return (
      <div className='playlist'>
        {this._titleCard()}
        {this._articles()}
        {this._addArticle()}
        <div>{this._captions()}</div>
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

    let account = <Link to="/playlist/login">Login</Link>;
    if(logged_in && current_user) {
      account = <span>{current_user.username}</span>;
    }

    const { caption, editingCaption } = this.props.Playlist;
    const editButtonProps = {
      href: '#',
      onClick: ()=>{
        dispatch(editingPlaylistCaption(true));
        dispatch(pushPath('/playlist/caption'));
      }
    }

    let renderCaption = <a {...editButtonProps}>Add Playlist Caption +</a>;
    if(!_.isEmpty(caption) && !editingCaption) {
      renderCaption = <p>{caption} <a {...editButtonProps}>edit</a></p>
    }

    if(editingCaption) {
      renderCaption = <div className='flex-grow playlist__caption'>{this.props.children}</div>
    }

    return (
      <div className="article-card flex-column flex-stretch">
        <div className="article-card__container border flex flex-column flex-stretch flex-center" ref={card => {this.cardElement = card}}>
          <div className="article-card__content flex flex-grow flex-column flex-stretch" ref={c => {this.cardContent = c}}>
            <div className={'article-card__header bg-navy px2'}>
              <h1 className='white'>Playlist title</h1>
              {account}
            </div>
            <div className='flex flex-column article-card__summary'>
              {renderCaption}
            </div>
          </div>
        </div>
      </div>)
  }

  _addArticle() {
    const {articles} = this.props.Playlist;
    if(articles.length < 5) {
      return (
      <div className="article-card article-card--add flex-column flex-stretch">
        <div className="article-card__container border flex flex-column flex-stretch flex-center" ref={card => {this.cardElement = card}}>
          <div className="full-height flex flex-center center flex-justify-center">
            <button className='btn btn-outline bg-white'
                    onClick={()=>{this.props.dispatch(addArticleCard())}}>+</button>
          </div>
        </div>
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
