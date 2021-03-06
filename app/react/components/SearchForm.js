import { updateQuery, fetchQuery, addSearch, isSearching } from '../actions';
import { search } from '../actions/SearchAPI';
import Icon from './Icon';

export default class SearchForm extends React.Component {
  constructor() {
    super()
    this._debouncedSearch = _.debounce(this._debouncedSearch, 300)
    _.bindAll(this, '_handleKeyPress');
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div className='relative'>
          <input onChange={this._handleInputChange.bind(this)}
               id='Search'
               ref='input'
               name='Search'
               autoFocus={true}
               type='text'
               onKeyPress={this._handleKeyPress}
               autoComplete='off'
               placeholder='Search Wikipedia'
               defaultValue={this.props.Search.queries[this.props.index]}
               className='field border-bottom search__input'/>
          <div className='search-icon'><Icon size="18px" icon="search" fill={'silver'} /></div>
        </div>
      </form>
    );
  }

  _handleKeyPress({which}) {
    if(which === 13) {
      console.log(this.refs.input);
      this.refs.input.blur()
    }
  }

  _handleInputChange(e) {
    e.persist()
    this._debouncedSearch(e.target.value.trim())
  }

  _debouncedSearch(query) {
    const {dispatch, index} = this.props;
    dispatch(updateQuery(index, query))
    dispatch(isSearching(true))
    if (query) {
      search(query, this._handleResults.bind(this));
    } else {
      this._handleResults([])
    }
  }
  _handleResults(results) {
    this.props.dispatch(addSearch(results, this.props.index))
    this.props.dispatch(isSearching(false))
  }
}
