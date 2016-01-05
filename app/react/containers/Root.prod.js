import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';
import configureStore from '../store/configureStore';
import childrenWithProps from '../utils/childrenWithProps';
const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App>{this.props.children}</App>
      </Provider>
    );
  }
}