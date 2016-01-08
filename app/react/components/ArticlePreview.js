import { connect } from 'react-redux';

class ArticlePreview extends React.Component {
  render() {
    return (
      <div>preview</div>
    )
  }
}

export default connect( state => {return state})(ArticlePreview);