import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import Icon from './Icon';
import es6BindAll from "es6bindall";

import {
  addArticle, 
  updateQuery,
  addArticleImages,
  updateCurrentEditingArticle
} from '../actions';

import { fetchArticleImages, fetchArticleSummary } from '../actions/SearchAPI';

class SearchResult extends React.Component {
  constructor() {
    super();
    // es6BindAll(this, []);
  }

  render() {
    const {title, thumbnail, terms, fullurl} = this.props.article;
    const thumb = (thumbnail !== undefined ? <div><img src={thumbnail.source}/></div> : null)
    const description = (terms !== undefined && terms.description !== undefined ? <p className='search-result__description'>{terms.description}</p> : null)
    return (
      <div className='search-result border mb2 bg-white'>
        <div className='flex border-bottom p1 pt2'>
          {thumb}
          <div className={(thumb ? 'px2' : '')}>
            <h3 style={{margin: 0}}>{title}</h3>
            {description}
          </div>
        </div>
        <div className='flex flex-justify search-result__actions p1'>
          <a className='action blue' href={fullurl} target='_blank'>Read Article <Icon size="14px" icon="external-link" fill={'blue'} /></a>
          <button className='btn btn--search-result' onClick={this.handleAddArticle.bind(this)}>Add to Playlist</button>
        </div>
      </div>)
  }

  handleAddArticle() {
    const {dispatch, article, Playlist} = this.props;
    const index = Playlist.editingArticle;
    
    let articleData = new Promise((resolve, reject)=>{
      fetchArticleSummary(article.title).done((data)=> {

        var pages = data.query.pages;
        const extract =  pages[_.keys(pages)[0]].extract;
        if(extract !== undefined) {
          article.extract = extract;
          resolve();
        } else {
          resolve();
        }
      })
    });

    articleData.then(()=>{
      dispatch(addArticle(index, article));
      fetchArticleImages(article.title, this.addArticleImages.bind(this));
    }).catch((reason)=> {console.log('Reject promise', reason)});    
  }

  addArticleImages(images) {
    const {dispatch, Playlist} = this.props;
    const index = Playlist.editingArticle;
    dispatch(addArticleImages(index, images))
    dispatch(pushPath('/playlists'))
    dispatch(updateCurrentEditingArticle(null));
    dispatch(updateQuery(index, ''));
  }
}

export default connect( state => {return state})(SearchResult);