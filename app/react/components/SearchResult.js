import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import { addArticle, updateQuery, addArticleImages, fetchArticleImages, updateCurrentEditingArticle } from '../actions';

class SearchResult extends React.Component {
  render() {
    const {title, thumbnail, terms, fullurl} = this.props.article;
    const thumb = (thumbnail !== undefined ? <div><img src={thumbnail.source}/></div> : null)
    const description = (terms !== undefined && terms.description !== undefined ? <p className='search-result__description'>{terms.description}</p> : null)
    return (
      <div className='search-result border mb2'>
        <div className='flex border-bottom p1 pt2'>
          {thumb}
          <div className={(thumb ? 'px2' : '')}>
            <h3 style={{margin: 0}}>{title}</h3>
            {description}
          </div>
        </div>
        <div className='flex search-result__actions'>
          <a className='btn border-right' href={fullurl} target='_blank'>Read Article</a>
          <button className='btn' onClick={this.handleAddArticle.bind(this)}>Add to Playlist</button>
        </div>
      </div>)
  }

  handleAddArticle() {
    const {dispatch, article, Playlist} = this.props;
    const index = Playlist.editingArticle;
    dispatch(addArticle(index, article))
    fetchArticleImages(article.title, this.addArticleImages.bind(this));
  }

  addArticleImages(images) {
    const {dispatch, Playlist} = this.props;
    const index = Playlist.editingArticle;
    dispatch(addArticleImages(index, images))
    dispatch(pushPath('/playlist'))
    dispatch(updateCurrentEditingArticle(null));
  }
}

export default connect( state => {return state})(SearchResult);