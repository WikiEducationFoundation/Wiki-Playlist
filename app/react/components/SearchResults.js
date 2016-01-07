import { fetchArticle } from '../actions';
import SearchResult from './SearchResult';

export default class SearchResults extends React.Component {
  render() {
    return (
      <div className="border-top">
      {this._results()}
      </div>
    )
  }

  _results() {
    const {query} = this.props;
    if(query !== undefined) {
      const {pages, redirects} = query;
      let results = [];
      this.page_ids = Object.keys(pages);
      for(var i = 0; i < this.page_ids.length; ++i) {
        const key = this.page_ids[i];
        results.push(<SearchResult key={`result_${key}`} article={pages[key]} />);
      }
      return results;
    } else {
      return <p>Loading results...</p>
    }
  }

}


