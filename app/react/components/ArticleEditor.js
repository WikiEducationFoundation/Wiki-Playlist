import GSAP from 'react-gsap-enhancer'
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';

class ArticleEditor extends React.Component {
  
  componentDidMount() {
    this.addAnimation(fadeIn);
  }

  render() {
    return (
      <div className='intially-hidden p2'>
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

function fadeIn({target}) {
  return TweenMax.from(target, 1, {
    opacity: 0,
    ease: Power2.easeOut,
    onStart: () => {
      // console.log(target)
      target[0].style.visibility = 'visible';
    }
  })
}

export default connect( state => {return state})(GSAP()(ArticleEditor));