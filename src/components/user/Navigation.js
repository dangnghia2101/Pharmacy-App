import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import {SignIn} from './screens/SignIn'
import {SignUp} from './screens/SignUp'
import Hello from './screens/Hello'

const Stack = createStackNavigator()
export const UserNavigation = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen component={Hello} name="Hello"/>
            <Stack.Screen component={SignIn} name="SignIn"/>
            <Stack.Screen component={SignUp} name="SignUp"/>
        </Stack.Navigator>
    )
}

