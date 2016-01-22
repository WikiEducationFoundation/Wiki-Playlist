import { updateQuery, fetchQuery, addSearch, isSearching } from '../actions';
import { search } from '../actions/SearchAPI';
import Icon from './Icon';

export default class SearchForm extends React.Component {
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div className='relative'>
          <input onKeyUp={this._handleKeyUp.bind(this)}
               onKeyDown={this._handleKeyDown.bind(this)}
               id='Search' 
               type='text'
               placeholder='Search Wikipedia'
               defaultValue={this.props.Search.queries[this.props.index]}
               className='field border-bottom search__input'/>
          <div className='search-icon'><Icon size="18px" icon="search" fill={'silver'} /></div>
        </div>
      </form>
    );
  }

  _handleKeyUp(e) {
    const {dispatch, index} = this.props;
    const query = e.target.value;
    dispatch(updateQuery(index, query))
    this.queryTimeout = setTimeout(()=>{
      dispatch(isSearching(true))
      search(query, this._handleResults.bind(this));
    }, 700)
  }

  _handleKeyDown(e) {
    clearTimeout(this.queryTimeout)
  }

  _handleResults(results) {
    this.props.dispatch(addSearch(results, this.props.index))
    this.props.dispatch(isSearching(false))
  }
}