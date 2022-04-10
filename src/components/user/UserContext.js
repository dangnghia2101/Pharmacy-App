import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SignIn, SignUp } from './UserService';
import constants from '../../utils/constants';

export const UserContext = createContext();
export const UserContextProvider = props => {
    const { db, children } = props
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [profile, setProfile] = useState({})

    const getProFile = () => {
        return profile
    }

    const onLogin = async (email, password) => {
        try{
            const res = await SignIn(email, password)
            console.log(res)
            if(res && res.token){

                await AsyncStorage.setItem(constants.TOKEN_KEY, res.token)
                // await AsyncStorage.setItem("user", JSON.stringify(user))
                setIsLoggedIn(true)
                return true;
                // setProfile({name: res.data.user.name, email: res.data.user.email, avatar: res.data.user.avatar, address: res.data.user.address, phone: res.data.user.phone, dob: res.data.user.dob})
            }else{
                setIsLoggedIn(false)
            }
        }catch(e){
            console.log("OnLogin error: ", e);
        }
        return false;
    }

    const onSignUp = async (email, password, confirm_password) => {
        try{
            const res = await SignUp(email, password, confirm_password);
            return res.status
        }catch(error){
            console.log("onSignUp error: ", error);
        }
        return false;
    }

    return(
        <UserContext.Provider
            value={{
                isLoggedIn,
                onLogin,
                onSignUp,
                getProFile,
                profile
            }}
        >
            {children}
        </UserContext.Provider>
    )
}