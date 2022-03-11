import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSidebarMenu  from './CustomSidebarMenu';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import MyLikedRecipes from '../screens/MyLikedRecipes';
import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="font-awesome" />
    }
  },
  MyLikedRecipes : {
    screen : MyLikedRecipes,
    navigationOptions:{
      drawerIcon : <Icon name="thumbs-up" type ="font-awesome"/>
    }
  },
  Notifications :{
    screen : NotificationScreen,
    navigationOptions:{
      drawerIcon : <Icon name="bell" type ="font-awesome" />,
    }
  },
    Settings : {
      screen : SettingScreen,
      navigationOptions:{
        drawerIcon : <Icon name="edit" type ="font-awesome" />,
      }
    }
},
  {
    contentComponent:CustomSidebarMenu
  },
  {
    initialRouteName : 'Home'
  })