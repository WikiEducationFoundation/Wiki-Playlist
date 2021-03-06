import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setArticleImage, updateCurrentEditingArticle } from '../actions';
import { pushPath } from 'redux-simple-router';
import es6BindAll from "es6bindall";
import LoadingAnimation from './LoadingAnimation';

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

    const { currentIndex } = this.state;
    const { editingArticle, articles } = this.props.Playlist;
    if(editingArticle === null) { return null; }
    if(articles[editingArticle].images === undefined) { 
      return (<div className='image-selector flex flex-column flex-justify center full-height flex-justify-center'>
        <div>
          <div>Fetching Images...</div>
          <LoadingAnimation/>
        </div>
      </div>);
    }

    const total_images = articles[editingArticle].images.length;

    const settings = {
      dots: (total_images < 8 ? true : false),
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      afterChange: this._updateImage
    };

    return(
      <div className='image-selector flex flex-column flex-justify'>
        <div>
          <Slider {...settings}>{this._images()}</Slider>
        </div>
        <div className='image-selector__controls p1 center actions'>
          {(total_images < 8 ? null : <span className='white'>{currentIndex + 1}/{total_images}</span>)}
        </div>
      </div>
    )
  }

  _cancel() {
    this.dispatch(pushPath('/playlists'))
  }

  _selectImage() {
    const { images, articleIndex, article } = this._getImages();
    this.dispatch(setArticleImage(articleIndex, images[this.state.currentIndex]));
    this.dispatch(updateCurrentEditingArticle(null));
    // this.props.finishEditing()
    // this.dispatch(pushPath('/playlists'));
    
  }

  _updateImage(index) {
    this.setState({
      currentIndex: index
    });
    const { images, articleIndex, article } = this._getImages();
    this.dispatch(setArticleImage(articleIndex, images[this.state.currentIndex]));
    // this.dispatch(updateCurrentEditingArticle(null));
  }

  componentWillUnmount() {
    // const { images, articleIndex, article } = this._getImages();
    // this.dispatch(setArticleImage(articleIndex, images[this.state.currentIndex]));
  }

  _getImages() {
    const { editingArticle, articles } = this.props.Playlist;
    return {
      images: articles[editingArticle].images,
      currentImage: articles[editingArticle].image,
      articleIndex: editingArticle,
      article: articles[editingArticle]
    }
  }

  _images() {
    const { images, currentImage, editingArticle } = this._getImages();
    let _images = [];
    images.map(img => {
      const selected = (img === currentImage ? true : false);
      _images.push(
        <div key={img} style={{display: 'inline-block', verticalAlign: 'top'}}>
          <ArticleImage 
            dispatch={this.props.dispatch} 
            articleIndex={editingArticle} 
            img={img}
            selected={selected}/>
        </div>)
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
      <div>
        <div style={style} className={'image-selector__image bg-gallery'}></div>
      </div>
    )
  }
}