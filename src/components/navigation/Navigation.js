import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import {UserNavigation} from '../user/Navigation'
import {ProductNavigation} from '../products/Navigation'

import { UserContext } from '../user/UserContext'

export const Navigation = () => {
    const { isLoggedIn } = useContext(UserContext);
    // const isLoggedIn = true;
    return (
        <NavigationContainer>
            {
               isLoggedIn == true ? <ProductNavigation/>:<UserNavigation/>
            // isLoggedIn == true ? <ProductNavigation/>:<ProductNavigation/>
            }
        </NavigationContainer>
    )
}

