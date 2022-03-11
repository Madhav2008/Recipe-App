import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Recipes from '../screens/Recipes';
import RecipeDetailsScreen  from '../screens/RecipeDetailsScreen';
import NotificationScreen from '../screens/NotificationsScreen'

export const AppStackNavigator = createStackNavigator({
  RecipeList : {
    screen : Recipes,
    navigationOptions:{
      headerShown : false
    }
  },
  RecipeDetails : {
    screen : RecipeDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  Notification : {
     screen : NotificationScreen,
     navigationOptions:{
       headerShown : false
     }
   }
 },

  {
    initialRouteName: 'RecipeList'
  }
);