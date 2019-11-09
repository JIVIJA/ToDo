import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../components/home/index';
import DetailScreen from '../components/detail/index';

const HomeNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Detail: {screen: DetailScreen},
});

export default createAppContainer(HomeNavigator);
