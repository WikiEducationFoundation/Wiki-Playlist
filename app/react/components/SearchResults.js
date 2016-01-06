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
      for(var key in pages) {
        const {title, thumbnail, terms} = pages[key];
        const thumb = (thumbnail !== undefined ? <img src={thumbnail.source}/> : null)
        const description = (terms !== undefined && terms.description !== undefined ? <p>{terms.description}</p> : null)
        results.push(<div key={`result_${key}`} className='p1 border-bottom flex'>
          {thumb}
          <div className={(thumb ? 'px2' : '')}>
            <h3 style={{margin: 0}}>{title}</h3>
            {description}
          </div>
        </div>)
      }
      return results;
    } else {
      return <p>Loading results...</p>
    }
  }

}