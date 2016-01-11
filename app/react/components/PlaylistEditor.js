import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import { updateCurrentEditingArticle, updateQuery } from '../actions';
import { pushPath } from 'redux-simple-router';

class PlaylistEditor extends React.Component {

  render() {
    return (
      <div>
        <div className='articles'>
          {this._articles()}
          <div>{this._captions()}</div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const {dispatch} = this.props;
    const {editingArticle} = this.props.Playlist;
    
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
