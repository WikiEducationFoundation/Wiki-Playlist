import { connect } from 'react-redux';
import { setArticleImage } from '../actions';


class ArticleImage extends React.Component {
  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        <img src={this.props.src}/>
      </div>
    )
  }

  handleClick() {
    const {dispatch, src, articleIndex} = this.props;
    dispatch(setArticleImage(articleIndex, src));
  }
}


class ImageSelector extends React.Component {
  render() {
    return(
      <div>
        Image selector
        <div className='flex'>{this._images()}</div>
      </div>
    )
  }

  _images() {
    const {editingArticle, articles} = this.props.Playlist;
    const images = articles[editingArticle].images;
    let _images = [];
    images.map(img => {
      _images.push(<ArticleImage key={img} dispatch={this.props.dispatch} articleIndex={editingArticle} src={img} />)
    });
    return _images;
  }
}

export default connect( state => {return state})(ImageSelector);