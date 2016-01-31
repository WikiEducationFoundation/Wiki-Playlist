import GSAP from 'react-gsap-enhancer'
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import { PLAYLISTS_PATH } from '../constants';

class ArticleSearch extends React.Component {

  componentDidMount() {
    this.addAnimation(fadeIn);
    const { editingArticle } = this.props.Playlist;
    // Redirect to playlist path if current editing article index is null
    if(!Number.isInteger(editingArticle)) {
      this.props.dispatch(pushPath(PLAYLISTS_PATH))
    }
  }

  render() {
    const { editingArticle, articles } = this.props.Playlist;
    return (
      <div className='search__container intially-hidden p2 vertical-overflow'>
        <div className='search__container__card'>
          <div className='search__container-header'>
            <div className='mb2 white'><strong>Add Article</strong></div>
            <SearchForm index={this.props.Playlist.editingArticle} {...this.props}/>
            <Link className='close-button' to='/playlists'>&#215;</Link>
          </div>
          {this._currentQuery()}
          <p>Search for a Wikipedia Page</p>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const {path} = nextProps.routing;
    const route = _.compact(path.split('/')).pop();
    if(route === 'playlists' && this.state.editing_options) {
      this.addAnimation(fadeOut)
    }
  }

  _currentQuery() {
    const {queries, history, searching} = this.props.Search;
    const query = queries[this.props.Playlist.editingArticle];
    if(query !== undefined && query.length) {
      return (
        <div>
          <div className='py1'><strong>Search Results For: "{query}"</strong></div>
          <SearchResults dispatch={this.props.dispatch} query={history[query]} isSearching={searching}/>
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
