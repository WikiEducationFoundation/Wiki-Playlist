import { Link } from 'react-router';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';
import Article from './Article';
import {updateCurrentEditingArticle} from '../actions';
import { pushPath } from 'redux-simple-router';


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
    console.log(this.props);
    const {articles, editingArticle} = this.props.userArticles;
    let _articles = [];
    articles.map((article, i) =>{
      _articles.push(<ArticleCard index={i} key={`article_${i}`} {...article} dispatch={this.props.dispatch}/>)
    })
    return _articles;
  }
}

PlaylistEditor.contextTypes - {
  router: React.PropTypes.func.isRequired
}

class ArticleCard extends React.Component {
  render() {
    const {title, index} = this.props;
    return (
      <div onClick={this.handleClick.bind(this)} to='/article-editor' className="p2 border-bottom">
        <h2 className="m0">{title}</h2>
      </div>
    )
  }

  handleClick() {
    const {index, dispatch} = this.props;
    dispatch(updateCurrentEditingArticle(index));
    dispatch(pushPath('/article-editor'))
  }
}



export default connect( state => {return state})(PlaylistEditor);
