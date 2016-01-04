import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import expect from 'expect';
import HelloWorld from './hello-world';

describe('HelloWorld', () => {
  const component = TestUtils.renderIntoDocument(<HelloWorld/>);

  it('renders', () => {
    expect(TestUtils.findRenderedComponentWithType(component, HelloWorld)).toExist();
  });
});
