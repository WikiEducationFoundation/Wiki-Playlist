import { connect } from 'react-redux';
import { addArticle, updateQuery } from '../actions';

class SearchResult extends React.Component {
  render() {
    const {title, thumbnail, terms, fullurl} = this.props.article;
    const thumb = (thumbnail !== undefined ? <div><img src={thumbnail.source}/></div> : null)
    const description = (terms !== undefined && terms.description !== undefined ? <p>{terms.description}</p> : null)
    return (
      <div className='p1 border-bottom flex search__result'>
        {thumb}
        <div className={(thumb ? 'px2' : '')}>
          <h3 style={{margin: 0}}>{title}</h3>
          {description}
          <a className='btn' href={fullurl} target='_blank'>Read Article</a>
          <button className='btn' onClick={this.handleAddArticle.bind(this)}>Add to Playlist</button>
        </div>
      </div>)
  }

  handleAddArticle() {
    const {dispatch, article, Playlist} = this.props;
    const index = Playlist.editingArticle;
    dispatch(addArticle(index, article))
    
  }
}

export default connect( state => {return state})(SearchResult);