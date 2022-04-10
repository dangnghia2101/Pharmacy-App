import React, { useState, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native'


import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import Icon from "react-native-dynamic-vector-icons";

import { UserContext } from '../UserContext';

import { COLORS, SIZES, FONTS, images } from '../../../../constants'

export const SignUp = (props) => {
  const { navigation } = props

  let [fontsLoaded] = useFonts({
    "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
    "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
  });

  const { onSignUp } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [password2, setPassword2] = useState("");
  const [hidePassword2, setHidePassword2] = useState(true);

  // const signUp = async () => {
  //   if (password2 == password) {
  //     const res = await onSignUp(email, password)
  //     if (res == true) {
  //       ToastAndroid.show("SignUp success", ToastAndroid.BOTTOM);
  //       navigation.goBack();
  //     } else {
  //       ToastAndroid.show("SignUp failue", ToastAndroid.BOTTOM);
  //     }
  //   } else {
  //     ToastAndroid.show("Password not correct", ToastAndroid.BOTTOM);
  //   }
  // }

  const onSignUpPress = async () => {
    if (!email || !password || !password2 || email.trim().length == 0 || password.trim().length == 0) {
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.CENTER)
    }

    if (!checkAccount(password, password2)) {
      ToastAndroid.show("Xác nhận mật khẩu không đúng", ToastAndroid.CENTER)
      return;
    }

    const res = onSignUp(email, password, password);
    if (res == false) {
      ToastAndroid.show("Đăng nhập không thành công", ToastAndroid.CENTER)
      return;
    }
    navigation.navigate('SignIn')

  }


  const windowWidth = Dimensions.get('window').width;

  // Header 
  function renderHeader() {
    return (
      <View style={{
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        marginTop: 50,
      }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            marginStart: 30,
          }}>
          <Image source={{ uri: "https://i.dlpng.com/static/png/6702281_preview.png" }}
            style={{
              height: 50,
              width: 50,
              alignItems: "flex-start"
            }}
          />

          <Text
            style={{
              marginStart: 20,
              color: COLORS.blue,
              fontFamily: "Roboto-Bold",
              ...FONTS.h1,

            }}>
            Pharmacy
          </Text>
        </View>
      </View>
    )
  }

  // Main
  function renderMain() {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>

          {/* Email */}
          <View style={styles.container_input}>
            <Icon name="email" type="Fontisto" size={20} color={COLORS.darkGray} />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={COLORS.darkGray}
            />
          </View>

          {/* Password */}
          <View style={styles.container_input}>
            <Icon name="onepassword" type="MaterialCommunityIcons" size={20} color={COLORS.darkGray} />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={COLORS.darkGray}
              secureTextEntry={hidePassword}
            />
            {/* Click hide/show Password */}
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}>
              <Icon style={{ marginRight: 20 }} name={hidePassword ? "eye-off-outline" : "eye-outline"} type="Ionicons" size={25} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>

          {/* Password 2*/}
          <View style={styles.container_input}>
            <Icon name="onepassword" type="MaterialCommunityIcons" size={20} color={COLORS.darkGray} />
            <TextInput
              style={styles.input}
              onChangeText={setPassword2}
              placeholder="Confirm password"
              placeholderTextColor={COLORS.darkGray}
              secureTextEntry={hidePassword2}
            />
            {/* Click hide/show Password */}
            <TouchableOpacity
              onPress={() => setHidePassword2(!hidePassword2)}>
              <Icon style={{ marginRight: 20 }} name={hidePassword2 ? "eye-off-outline" : "eye-outline"} type="Ionicons" size={25} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>


          {/* Forgot password */}
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginHorizontal: 30,
              marginTop: 10
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}>
              <Text style={{ textAlign: 'right', color: COLORS.black, fontFamily: "Roboto-regular" }} >Forgot password!</Text>
            </TouchableOpacity>
          </View>

          {/* Button SignUp */}
          <View style={{
            marginHorizontal: 20,
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20
          }}>
            <TouchableOpacity
              style={styles.button}
              onPress={onSignUpPress}
            >
              <Text
                style={{ color: COLORS.white, ...FONTS.body3, fontFamily: "Roboto-regular", fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>



        </View>
      </View>
    )
  }

  function checkAccount(pass1, pass2) {
    console.log("Password 1 ", pass1, " Password 2: ", pass2)
    if (pass1 != pass2) {
      return false
    } else return true
  }

  // Footer
  function renderFooter() {
    return (
      <View
        style={{
          alignItems: 'center',
          bottom: 0,

        }}>

        <Image
          source={images.pharmacy}
          style={{
            width: windowWidth,
            height: 350,
            resizeMode: 'contain',
          }} />
      </View>
    )
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderMain()}
        {renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center', 
    // alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  input: {
    height: 40,
    marginHorizontal: 30,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    color: COLORS.darkGray,
    flex: 1,
    fontFamily: "Roboto-regular",
  },
  button: {
    height: 55,
    backgroundColor: COLORS.blue1,
    borderRadius: 10,
    color: COLORS.white,
    flex: 1,
    fontFamily: "Roboto-regular",
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_input: {
    marginHorizontal: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 10,
    marginTop: 20
  },
})
