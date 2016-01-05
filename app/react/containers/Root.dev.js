import DevTools from './DevTools';
import { Provider } from 'react-redux';
import App from '../components/App';
import configureStore from '../store/configureStore';
import childrenWithProps from '../utils/childrenWithProps';
const store = configureStore();

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <App>{childrenWithProps(this.props.children)}</App>
          <DevTools />
        </div>
      </Provider>
    );
  }
}