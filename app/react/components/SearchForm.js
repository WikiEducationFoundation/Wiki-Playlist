import {updateQuery, fetchQuery, addSearch, search} from '../actions';

export default class SearchForm extends React.Component {
  render() {
    // console.log('searchform', this.props);
    return (
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor='Search'>Search Wikipedia</label>
        <input onKeyUp={this._handleKeyUp.bind(this)}
               onKeyDown={this._handleKeyDown.bind(this)}
               id='Search' 
               type='text'
               defaultValue={this.props.Search.queries[this.props.index]}
               className='field ml1'/>
      </form>
    );
  }

  _handleKeyUp(e) {
    const {dispatch, index} = this.props;
    const query = e.target.value;
    dispatch(updateQuery(index, query))
    this.queryTimeout = setTimeout(()=>{
      dispatch(fetchQuery(query, this._handleResults.bind(this)))
    }, 300)
  }

  _handleKeyDown(e) {
    clearTimeout(this.queryTimeout)
  }

  _handleResults(results) {
    this.props.dispatch(addSearch(results, this.props.index))
  }
}