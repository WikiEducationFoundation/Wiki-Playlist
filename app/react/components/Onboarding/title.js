import GSAP from 'react-gsap-enhancer';
import { connect } from 'react-redux';
import {
  setOnboardingStep
} from '../../actions';

class OnboardingTitle extends React.Component {
  constructor(props) {
    super();
    this.dispatch = props.dispatch;
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
      <div className='card onboarding__title mt2 mb2 md-flex'>
        <div className='p3 flex flex-column onboarding__column'>
          <h3 className='h3 mb1'>Wikipedia Collection Creator</h3>
          <p className='mb2'>Welcome short paragraph. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>
          <div>
            <button className='btn btn-primary'
              onClick={()=>{
                this.dispatch(setOnboardingStep(1));
              }}>Continue</button></div>
        </div>
        <div className='onboarding__image bg-gallery p4' style={{
          backgroundImage: `url('//upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg')`
        }}/>
      </div>
    );
  }

  titleCard() {
    return(
      <div className='card onboarding__title mt2 mb2 md-flex'>
        <div className='p3 flex flex-column onboarding__column'>
          <h3 className='h3 mb1'>Name of your Collection</h3>
          <p className='mb2'>Note! This can be changed at anytime</p>
          <input className='field' placeholder='Collection Name'></input>
          <div>
            <button className='action mr2'
              onClick={()=>{
                this.dispatch(setOnboardingStep(0));
              }}>Back</button>
            <button className='btn btn-primary' 
              onClick={()=>{
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