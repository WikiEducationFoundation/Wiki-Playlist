import GSAP from 'react-gsap-enhancer'
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';

class ArticleSearch extends React.Component {
  
  componentDidMount() {
    console.log('article search')
    this.addAnimation(fadeIn);
  }

  render() {
    return (
      <div className='intially-hidden p2'>
        <h3>Add Article</h3>
        <SearchForm index={this.props.Playlist.editingArticle} {...this.props}/>
        {this._currentQuery()}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const {path} = nextProps.routing;
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
      target[0].style.visibility = 'visible';
    }
  })
}

function fadeOut({target}) {
  console.log('fadeout', target)
  return TweenMax.fromTo(target, 1, {
      opacity: 0,
      ease: Power2.easeOut,
    },
    {
      opacity: 1,
      onComplete: () => {
       target[0].style.visibility = 'hidden';
      }
    })
}

export default connect( state => {return state})(GSAP()(ArticleSearch));