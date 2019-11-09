import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import App from './AppNavigator';

export default createAppContainer( // eslint-disable-line
  createSwitchNavigator(
    {
      App,
    },
    {
      initialRouteName: 'App',
    },
  ),
); // eslint-disable-line
