import { updateCurrentEditingArticle } from '../actions';
import { pushPath } from 'redux-simple-router';

export default class ArticleCard extends React.Component {
  render() {
    const {title, index} = this.props;
    return (
      <div onClick={this.handleClick.bind(this)} 
           className="p2 border-bottom article-card">
        <h2 className="m0">{title}</h2>
      </div>
    )
  }

  handleClick() {
    const {index, dispatch} = this.props;
    dispatch(updateCurrentEditingArticle(index));
    dispatch(pushPath('/playlist/new/article'))
  }
}