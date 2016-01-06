import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';


class PlaylistEditor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='border-top'>
        {this._articles()}
      </div>
    )
  }

  _articles() {
    const {articles, editingArticle} = this.props.userArticles;
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

PlaylistEditor.contextTypes - {
  router: React.PropTypes.func.isRequired
}

export default connect( state => {return state})(PlaylistEditor);
