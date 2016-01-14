import ArticleCard from './ArticleCard';
import { connect } from 'react-redux';
import { setPlaylistTitle, editingPlaylistTitle } from '../actions';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';
import es6BindAll from "es6bindall"; 
import TextArea from './TextArea';
import ContentEditable from 'react-contenteditable';

class PlaylistTitle extends React.Component {
  constructor(props) {
    super();

    this.dispatch = props.dispatch;
    const { title } = props.Playlist;

    es6BindAll(this, [
      '_saveTitle',
      '_updateTitle'
    ]);

    this.state = {
      title: title,
      html: `<h1>${title}</h1>`
    }
  }

  render() {
    return (
      <ContentEditable
          className='white'
          html={this.state.html}
          disabled={false}
          onBlur={this._saveTitle}
          onChange={this._updateTitle} />
    )
  }

  _updateTitle(e) {
    console.log(e.target.textContent);
    this.setState({title: e.target.value})
    // this.dispatch(setPlaylistTitle(this.state.title))
    // this.dispatch(editingPlaylistTitle(false))
    // this.dispatch(pushPath('/playlist'));
  }

  _saveTitle() {
    console.log('save title');
  }
}

export default connect( state => {return state})(PlaylistTitle);
