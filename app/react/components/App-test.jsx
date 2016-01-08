import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import expect from 'expect';
import App from './App';
import configureStore from '../store/configureStore';
const store = configureStore();

describe('App', () => {
  const component = TestUtils.renderIntoDocument(<App store={store} />);
  it('renders', () => {
    expect(TestUtils.findRenderedComponentWithType(component, App)).toExist();
  });
});
