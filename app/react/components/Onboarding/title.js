import GSAP from 'react-gsap-enhancer';
import { connect } from 'react-redux';
import {
  TITLE_LIMIT
} from '../../constants';

import {
  setOnboardingStep,
  setPlaylistTitle
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
            <h3 className='h3 mb1'>Wikipedia Collection Creator</h3>
            <p className='mb2'>Welcome short paragraph. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>
          </div>
          <div>
            <button className='btn btn-primary'
              onClick={()=>{
                this.dispatch(setOnboardingStep(1));
              }}>Continue</button>
          </div>
        </div>
        <div className='onboarding__image bg-gallery p4' style={{
          backgroundImage: `url('//upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg')`
        }}/>
      </div>
    );
  }

  titleCard() {
    return(
      <div className='card onboarding__title mb2 md-flex'>
        <div className='p2 md-p3 flex flex-column onboarding__column'>
          <h3 className='h3 mb1'>Name of your Collection</h3>
          <p className='mb2'>Note! This can be changed at anytime</p>
          <div className='relative'>
            <input className='field p1 mb1' 
                 placeholder='Collection Name'
                 value={this.state.title}
                 onChange={({target})=>{
                  let text = target.value.substr(0, TITLE_LIMIT);
                  this.setState({title: text});
                 }}></input>
            <small className='character-limit'>{TITLE_LIMIT - this.state.title.length}</small>
          </div>
          <div>

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
          backgroundImage: `url('//upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg')`
        }}/>
      </div>
    );
  }
}

export default connect( state => {return state})(GSAP()(OnboardingTitle))