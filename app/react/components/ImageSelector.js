import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setArticleImage } from '../actions';


class ImageSelector extends React.Component {

  render() {
    return(
      <div>
        Image selector
        <div className='flex'>{this._images()}</div>
        <Link className='btn btn-primary' to='/playlist/new'>Select Image</Link>
      </div>
    )
  }

  _images() {
    const {editingArticle, articles} = this.props.Playlist;
    const images = articles[editingArticle].images;
    const currentImage = articles[editingArticle].image;
    let _images = [];
    images.map(img => {
      const selected = (img === currentImage ? true : false);
      _images.push(<ArticleImage key={img} 
                                 dispatch={this.props.dispatch} 
                                 articleIndex={editingArticle} 
                                 src={img} 
                                 selected={selected}/>)
    });
    return _images;
  }
}

export default connect( state => {return state})(ImageSelector);


/* ArticleImage for ImageSelector
--------------------------------------------- */
class ArticleImage extends React.Component {
  render() {
    return (
      <div className={'p1' + (this.props.selected ? ' bg-aqua' : '')}  onClick={this.handleClick.bind(this)}>
        <img src={this.props.src}/>
      </div>
    )
  }

  handleClick() {
    const {dispatch, src, articleIndex} = this.props;
    dispatch(setArticleImage(articleIndex, src));
  }
}