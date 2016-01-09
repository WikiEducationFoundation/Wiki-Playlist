import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setArticleImage } from '../actions';
import es6BindAll from "es6bindall"; 
import { pushPath } from 'redux-simple-router';

class ImageSelector extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentIndex: 0
    }

    this.dispatch = props.dispatch;

    es6BindAll(this, [
        '_updateImage', 
        '_selectImage',
        '_cancel',
        '_getImages'
      ]);
  }

  render() {

    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: this._updateImage
    };

    return(
      <div className='image-selector flex flex-column flex-justify'>
        <div>
          <Slider {...settings}>{this._images()}</Slider>
          <p className='center'>Swipe to view more thumbnails</p>
        </div>
        <div className='flex actions border-top'>
          <button className='btn border-right' onClick={this._cancel}>Cancel</button>
          <button className='btn' onClick={this._selectImage}>Select</button>
        </div>
      </div>
    )
  }

  _cancel() {
    this.dispatch(pushPath('/playlist'))
  }

  _selectImage() {
    const {images, articleIndex} = this._getImages();
    this.dispatch(setArticleImage(articleIndex, images[this.state.currentIndex]));
    this.dispatch(pushPath('/playlist/article/caption'));
  }

  _updateImage(index) {
    this.setState({
      currentIndex: index
    })
  }

  _getImages() {
    const {editingArticle, articles} = this.props.Playlist;
    return {
      images: articles[editingArticle].images,
      currentImage: articles[editingArticle].image,
      articleIndex: editingArticle
    }
  }

  _images() {
    const {images, currentImage, editingArticle} = this._getImages();
    let _images = [];
    images.map(img => {
      const selected = (img === currentImage ? true : false);
      _images.push(
        <ArticleImage key={img} 
                      dispatch={this.props.dispatch} 
                      articleIndex={editingArticle} 
                      img={img}
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
    const {url, description} = this.props.img;
    const style = {
      backgroundImage: `url(${url})`
    }
    return (
      <div style={style} className={'image-selector__image' + (this.props.selected ? ' bg-aqua' : '')} />
    )
  }
}