import { updateCurrentEditingArticle } from '../actions';
import { pushPath } from 'redux-simple-router';

export default class ArticleCard extends React.Component {
  render() {
    const {title, index} = this.props;
    return (
      <div className='article-card' onClick={this.handleClick.bind(this)} to='/article-editor' className="p2 border-bottom">
        <h2 className="m0">{title}</h2>
      </div>
    )
  }

  handleClick() {
    const {index, dispatch} = this.props;
    dispatch(updateCurrentEditingArticle(index));
    dispatch(pushPath('/playlist/article-editor'))
  }
}