import { View, Text } from 'react-native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()


import Profile from './Profile'
import EditProfile from './EditProfile'
import CartHistory from './CartHistory'

const ProfileStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Profile">
        <Stack.Screen component={Profile} name="Profile"/>
        <Stack.Screen component={EditProfile} name="EditProfile"/>
        <Stack.Screen component={CartHistory} name="CartHistory"/>
    </Stack.Navigator>
  );
};


export default ProfileStack;
