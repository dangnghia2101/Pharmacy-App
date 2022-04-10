import { View, Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Hello = (props) => {
    const {navigation} = props

    setTimeout(() => {navigation.navigate("SignIn")}, 2000)

    return <LottieView source={require('../../../../assets/lottie/93099-green-star.json')} autoPlay loop />;

};

export default Hello;
