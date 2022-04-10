import React, {useState, useContext} from 'react'
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
    Pressable
} from 'react-native'


import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import Icon from "react-native-dynamic-vector-icons";


import { UserContext } from '../UserContext'

import {COLORS, SIZES, FONTS, images} from '../../../../constants'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SignIn = (props) => {
    const {navigation} = props
    const { onLogin, getProFile, profile } = useContext(UserContext)

    let [fontsLoaded] = useFonts({
      "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
      "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
      "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);


    const onSigninPress = async() => {
      if(!email || !password ||  email.trim().length == 0 || password.trim().length == 0){
        ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.CENTER)
      }

      const res = await onLogin(email, password);
      if(res == false){
        ToastAndroid.show("Đăng nhập không thành công", ToastAndroid.CENTER)
        return
      }else{
        ToastAndroid.show("Đăng nhập thành công", ToastAndroid.CENTER)
      }
    }

    // Header 
    function renderHeader(){
      return(
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
            <Image source={{uri: "https://www.pikpng.com/pngl/b/148-1481261_capsule-pharmacy-antimicrobial-stewardship-logo-clipart.png"}}
              style={{
                height: 50,
                width: 50,
                alignItems: "flex-start"
              }}
            />

            <Text
              style={{
                marginStart: 20,
                color: COLORS.blue1,
                fontFamily: "Roboto-regular",
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
      return(
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
                        placeholderTextColor = {COLORS.darkGray}
                    />
            </View>

            {/* Password */}
            <View style={styles.container_input}>
              <Icon name="onepassword" type="MaterialCommunityIcons" size={25} color={COLORS.darkGray} />
              <TextInput
                      style={styles.input}
                      onChangeText={setPassword}
                      placeholder="Password"
                      placeholderTextColor = {COLORS.darkGray}
                      secureTextEntry={hidePassword}
                  />
                {/* Click hide/show Password */}
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}>
                  <Icon style={{marginRight: 20}} name={hidePassword ? "eye-off-outline":"eye-outline"} type="Ionicons" size={25} color={COLORS.darkGray} />
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
                  style={{flex: 1}}>
                  <Text style={{textAlign: 'right', color: COLORS.black, fontFamily: "Roboto-regular"}} >Forgot password!</Text>
                </TouchableOpacity>
            </View>

            {/* Button SignIn */}
            <View style={{
                    marginHorizontal: 20,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20
            }}>
              <TouchableOpacity 
                style={styles.button}
                onPress={onSigninPress}
                >
                <Text style={{ color: COLORS.white, ...FONTS.body3, fontFamily: "Roboto-regular", fontSize: 18}}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* SignUp */}
        
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={{ textDecorationLine: 'underline'}}><Text>Sign up</Text></TouchableOpacity>

          </View>
        </View>
      )
    }

    // Footer
    function renderFooter() {
      return(
        <View
          style={{
            alignItems: 'center',
            bottom: 0,
            marginTop: 65
          }}>

          <Image 
                source={images.pharmacy}
                style={{
                  width: windowWidth,
                  height: 350,
                  resizeMode: 'contain',
                }}/>
        </View>
      )
    }

    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{height: windowHeight + 70, flex: 1}}>
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
  button:{
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
      paddingLeft:20,
      paddingVertical: 10,
      marginTop: 20
    },
})
