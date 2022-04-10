import React from 'react'
import { View, Text , Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

import Home from './screens/Home'
import Search from './screens/Search'
import Cart from './screens/Cart'
import Profile from './screens/Profile'
import DetailProduct from './screens/DetailProduct'
import MoreProduct from './screens/MoreProduct';

import ProfileStack from './screens/ProfileStack';

import {COLORS, SIZES, FONTS, images} from '../../../constants'

import Icon from "react-native-dynamic-vector-icons";

function HomeNavigator(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Home">
            <Stack.Screen component={DetailProduct} name="DetailProduct"/>
            <Stack.Screen component={Home} name="Home"/>
            <Stack.Screen component={MoreProduct} name="MoreProduct"/>
        </Stack.Navigator>
    )
}

const SearchNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Search">
            <Stack.Screen component={Search} name="Search"/>
            <Stack.Screen component={DetailProduct} name="DetailProduct"/>
        </Stack.Navigator>
    )
}


export const ProductNavigation = (props) => {
    return (
        <Tab.Navigator
            initialRouteName="HomeNavigator"
            screenOptions={({route}) => ({
                tabBarIcon: () => {
                    if(route.name == "HomeNavigator"){
                        return <Icon name="home" type="AntDesign" size={25} color={COLORS.darkGray} />
                    }else if(route.name == "SearchNavigator"){
                        return <Icon name="search1" type="AntDesign" size={25} color={COLORS.darkGray} />
                    }else if(route.name == "Cart"){
                        return <Icon name="shoppingcart" type="AntDesign" size={25} color={COLORS.darkGray} />
                    }else if(route.name == "ProfileStack"){
                        return <Icon name="profile" type="AntDesign" size={25} color={COLORS.darkGray} />
                    }
                },
                tabBarLabel: ({focused}) => {
                    if(route.name == "HomeNavigator" && focused){
                        return <Icon name="dot-single" type="Entypo" size={20} color={COLORS.darkGray} />
                    }else if(route.name == "SearchNavigator" && focused){
                        return <Icon name="dot-single" type="Entypo" size={20} color={COLORS.darkGray} />
                    }else if(route.name == "Cart" && focused){
                        return <Icon name="dot-single" type="Entypo" size={20} color={COLORS.darkGray} />
                    }else if(route.name == "ProfileStack" && focused){
                        return <Icon name="dot-single" type="Entypo" size={20} color={COLORS.darkGray} />
                    }
                },
                headerShown: false  
            }
            )}
            >
            <Tab.Screen component={HomeNavigator} name="HomeNavigator"/>
            <Tab.Screen component={SearchNavigator} name="SearchNavigator"/>
            <Tab.Screen component={Cart} name="Cart" />
            <Tab.Screen component={ProfileStack} name="ProfileStack"/>
        </Tab.Navigator>
    )
}

