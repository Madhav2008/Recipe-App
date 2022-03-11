import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import WriteRecipes from '../screens/WriteRecipes';
import Recipes from '../screens/Recipes';

export const AppTabNavigator = createBottomTabNavigator({
  Recipes : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon :   <Image source={require("../assets/ll.png")} style={{width: 50, height: 30}}/>,
      tabBarLabel : "Recipes",
    }
  },
  WriteRecipes: {
    screen: WriteRecipes,
    navigationOptions :{
      tabBarIcon :<Image source={require("../assets/ll.png")} style={{width: 50, height: 30,}} />,
      tabBarLabel : "Write Recipes",
    }
  }
});