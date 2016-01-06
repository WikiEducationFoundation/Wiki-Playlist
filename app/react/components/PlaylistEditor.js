import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import { updateCurrentEditingArticle, updateQuery } from '../actions';


class PlaylistEditor extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    const {editingArticle} = this.props.Playlist;
    dispatch(updateCurrentEditingArticle(null));
    // dispatch(updateQuery(editingArticle, ''))
  }

  render() {
    return (
      <div className='border-top'>
        {this._articles()}
      </div>
    )
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
          {...article} />
      )
    })
    return _articles;
  }
}

export default connect( state => {return state})(PlaylistEditor);
