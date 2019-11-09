import React from 'react';

import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import {YellowBox} from 'react-native';
import Navigation from './navigation/index';

YellowBox.ignoreWarnings(['']);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
