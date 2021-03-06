import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import Icon from './Icon';
import es6BindAll from "es6bindall";

import {
  addArticle,
  updateQuery,
  addArticleImages,
  updateCurrentEditingArticle,
  articleLoading
} from '../actions';

import { fetchArticleImages, fetchArticleSummary } from '../actions/SearchAPI';

class SearchResult extends React.Component {
  constructor() {
    super();
    // es6BindAll(this, []);
  }

  render() {
    const {title, thumbnail, terms, fullurl} = this.props.article;
    const thumb = (thumbnail !== undefined ? <div style={{width: 60, height: 60, backgroundImage: `url(${thumbnail.source})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}></div> : null)
    const description = (terms !== undefined && terms.description !== undefined ? <p className='search-result__description'>{terms.description}</p> : null)
    return (
      <div className='search-result border mb2 bg-white'>
        <div className='flex flex-wrap border-bottom p1 pt2'>
          {thumb}
          <div className={'search-results__summary ' + (thumb ? 'px2' : '')}>
            <h3 style={{margin: 0, marginBottom: 3}}>{title}</h3>
            {description}
          </div>
        </div>
        <div className='flex flex-justify flex-center search-result__actions p1'>
          <a className='action' href={fullurl} target='_blank'>Read Article <Icon size="14px" icon="external-link" fill={'#15B5C2'} /></a>
          <button className='btn btn--search-result' onClick={this.handleAddArticle.bind(this)}>Add to Playlist</button>
        </div>
      </div>)
  }

  handleAddArticle() {
    const {dispatch, article, Playlist, Search} = this.props;
    const index = Playlist.editingArticle;

    dispatch(articleLoading(index, true));
    dispatch(pushPath('/playlists'))

    let articleData = new Promise((resolve, reject)=>{

      fetchArticleSummary(article.title).done((data)=> {
        var pages = data.query.pages;
        const result = pages[_.keys(pages)[0]];
        let extract =  result.extract;

        const searchHistory = Search.history[result.title];
        
        var short_summary = null;
        if(searchHistory !== undefined) {
          short_summary = _.get(searchHistory[0], "terms.description[0]", null)
        }
        
        if(extract === "" && short_summary) {
          extract = short_summary;
        }
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
      fetchArticleImages(article, this.addArticleImages.bind(this));
    }).catch((reason)=> {console.log('Reject promise', reason)});
  }

  addArticleImages(images) {
    const {dispatch, Playlist} = this.props;
    const index = Playlist.editingArticle;
    dispatch(addArticleImages(index, images))
    dispatch(articleLoading(index, false));
    dispatch(updateQuery(index, ''));
  }
}

export default connect( state => {return state})(SearchResult);
