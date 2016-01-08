import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import { updateCurrentEditingArticle, updateQuery } from '../actions';


class PlaylistEditor extends React.Component {

  render() {
    return (
      <div className=''>
        {this._articles()}
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
        <ArticleCard 
          index={i}
          key={`article_${i}`}
          dispatch={this.props.dispatch}
          editing={editingArticle}
          {...article}>
          {(editingArticle === i ? this.props.children : null)}</ArticleCard>
      )
    })
    return _articles;
  }
}

export default connect( state => {return state})(PlaylistEditor);
