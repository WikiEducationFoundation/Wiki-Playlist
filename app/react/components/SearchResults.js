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
      query.map((article, i) => {
        // Filter out disambiguation pages they aren't useful to us
        let description = _.get(article, 'terms.description[0]', null);
        if(!description || description && description.indexOf('disambiguation page') === -1) {
          results.push(<SearchResult key={`result_${i}`} article={article} />);
        }
      })
      return results;
    } else {
      return <p>{(isSearching ? 'Loading results...' : 'No results found')}</p>
    }
  }

}


