import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';

class ArticleEditor extends React.Component {
  render() {
    return (
      <div>
        <SearchForm index={this.props.Playlist.editingArticle} {...this.props}/>
        {this._currentQuery()}
      </div>
    )
  }

  _currentQuery() {
    const {queries, history} = this.props.Search;
    const query = queries[this.props.Playlist.editingArticle];
    if(query !== undefined && query.length) {
      return (
        <div>
          <h2>Search For: "{query}"</h2>
          <SearchResults dispatch={this.props.dispatch} query={history[query]}/>
        </div>
      );
      
    } else {
      return null;
    }
  }
}

export default connect( state => {return state})(ArticleEditor);