import GSAP from 'react-gsap-enhancer';
import { connect } from 'react-redux';
import {
  TITLE_LIMIT
} from '../../constants';

import {
  setOnboardingStep,
  setPlaylistTitle,
  updateCurrentEditingArticle,
} from '../../actions';

class OnboardingTitle extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
    this.state = {
      title: ''
    }
  }
  render() {
    const { step } = this.props.Onboarding;
    switch (step) {
      case 0:
        return this.welcomeCard()
      case 1:
        return this.titleCard()
      default:
        return null;
    }
  }

  welcomeCard() {
    console.log('welcome')
    return(
      <div className='card onboarding__title mb2 md-flex'>
        <div className='p2 flex flex-column onboarding__column'>
          <div>
            <h3 className='h2 mb2 onboarding__header'>Wikipedia Playlist Builder</h3>
            <p className='mb2 caption'>Celebrate the joy of knowledge by creating a Playlist of your 3–5 favorite Wikipedia * articles, then sharing your Playlist on social media.</p>
          </div>
          <div>
            <button className='btn btn-primary right'
              onClick={()=>{
                this.dispatch(setOnboardingStep(1));
              }}>Start</button>
          </div>
        </div>
        <div className='onboarding__image bg-gallery p4' style={{
          backgroundImage: `url('/images/wikipedia-logo.png')`
        }}/>
      </div>
    );
  }

  titleCard() {
    return(
      <div className='card onboarding__title mb2 md-flex'>
        <div className='p2 md-p3 flex flex-column onboarding__column'>
          <h3 className='h2 mb1 onboarding__header'>Name of your Playlist</h3>
          <div className='relative right'>
            <input className='field p1'
                 placeholder='Collection Name'
                 value={this.state.title}
                 onChange={({target})=>{
                  let text = target.value.substr(0, TITLE_LIMIT);
                  this.setState({title: text});
                 }}></input>
            <small className='character-limit'>{TITLE_LIMIT - this.state.title.length}</small>
          </div>
          <p className='mb1 gray'>Note! This can be changed at anytime</p>
          <div className='right-align'>

            <button className='action mr2'
              onClick={()=>{
                this.dispatch(setOnboardingStep(0));
              }}>Back</button>

            <button className='btn btn-primary'
              onClick={()=>{
                this.dispatch(setPlaylistTitle(this.state.title));
                this.dispatch(setOnboardingStep(2));
              }}>Next</button></div>
        </div>
        <div className='onboarding__image bg-gallery p4' style={{
          backgroundImage: `url('/images/wikipedia-logo.png')`
        }}/>
      </div>
    );
  }
}

export default connect( state => {return state})(GSAP()(OnboardingTitle))
