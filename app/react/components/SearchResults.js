import { fetchArticle } from '../actions';
import SearchResult from './SearchResult';

export default class SearchResults extends React.Component {
  render() {
    return (
      <div className="search-results">
      {this._results()}
      </div>
    )
  }

  _results() {
    const {query, isSearching} = this.props;
    if(query !== undefined) {
      let results = [];
      query.map((article, i) => results.push(<SearchResult key={`result_${i}`} article={article} />))
      return results;
    } else {
      return <p>{(isSearching ? 'Loading results...' : 'No results found')}</p>
    }
  }

}


