import { StyleSheet, Text, View, Pressable, TextInput, Image, ToastAndroid } from 'react-native';
import React, {useState, useContext} from 'react';

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

import Icon from "react-native-dynamic-vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

import {COLORS, SIZES, FONTS, images} from '../../../../constants'
import { ProductContext } from '../ProductContext';
import { UserContext } from '../../user/UserContext'


const EditProfile = (props) => {
  const {navigation} = props;
  //const { _id, address, phone, avatar, dob, email, name } = User;

  const {onSaveProfile} = useContext(ProductContext)
  const {profile} = useContext(UserContext)

  console.log("nghai: ", profile)

  const [fullname, setFullname] = useState(profile.name);
  const [location, setLocation] = useState(profile.address);
  const [mobile, setMobile] = useState(profile.phone);
  const [birthday, setBirthday] = useState(profile.dob);

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
    "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
  });

  // render header
  const renderHeader = () => {
      return(
          <View
              style={[styles.flexRow, {marginTop: 40}]}>

              
              <Pressable
                  style={{
                      borderRadius: 50,
                      height: 45,
                      width: 45,
                      justifyContent: 'center', 
                      alignItems: 'center',
                  }}
                  onPress = {() => navigation.goBack()}
                  >
                  <Icon name="chevron-back" type="Ionicons" size={30} color={COLORS.darkGray}/>
              </Pressable>

              <Text style={{ fontFamily: "Roboto-regular", fontSize: 22, fontWeight: "bold", marginHorizontal: '25%' }}>Edit profile</Text>

          </View>
      )
  }

  // render images
    const renderImage = () => {
      return(
          <View
              style={{
                  alignItems: 'center',
                  width: '100%',
              }}>
    
                  <Image 
                      source={{uri: profile.avatar}}
                      style={{
                          width: 160,
                          height: 160,
                          marginTop: 25,
                          borderRadius: 20,
                      }}
                  />
                  <Text style={{ fontFamily: "Roboto-Black", fontSize: 22, marginTop: 5, color: COLORS.gray}}> { profile.name } </Text>
                  <Text style={{ fontFamily: "Roboto-regular", fontSize: 14}}>{ profile.email }</Text>
          </View>
      )
    }

  // render edit profile
  const renderEditProfile = () => {
    const displayTime = (time) => {
      time = new Date(time);
      return time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear()
    }

    return(
      <View
        style={{
          width: "100%",
          marginHorizontal: 20,
          marginTop: 30
        }}>
        
        {/* Edit name */}
        <View
          style={styles.containerTextEdit}>
          <Text style={{fontFamily: "Roboto-regular", fontSize:15, color: COLORS.black, fontWeight: "bold"}}>User name</Text>
          <TextInput value={fullname} onChangeText={setFullname} style={{fontFamily: "Roboto-regular", width: "65%", textAlign: 'right'}}/>
        </View>

        {/* Edit location */}
        <View
          style={styles.containerTextEdit}>
          <Text style={{fontFamily: "Roboto-regular", fontSize:15, color: COLORS.black, fontWeight: "bold"}}>Your adress</Text>
          <TextInput value={location} onChangeText={setLocation} style={{fontFamily: "Roboto-regular", width: "65%", textAlign: 'right'}}/>
        </View>

        
        {/* Edit mobile */}
        <View
          style={styles.containerTextEdit}>
          <Text style={{fontFamily: "Roboto-regular", fontSize:15, color: COLORS.black, fontWeight: "bold"}}>Phone number</Text>
          <TextInput value={mobile} onChangeText={setMobile} style={{fontFamily: "Roboto-regular", width: "65%", textAlign: 'right'}}/>
        </View>

        {/* Edit birthday */}
        <View
          style={styles.containerTextEdit}>
          <Text style={{fontFamily: "Roboto-regular", fontSize:15, color: COLORS.black, fontWeight: "bold"}}>Your bithday</Text>
          <TextInput onPressIn={() => setShowDateTimePicker(true)} value={displayTime(birthday)} style={{fontFamily: "Roboto-regular", width: "65%", textAlign: 'right'}}/>
        </View>

      </View>
    )
  }

  const updateProfile = () => {
    onSaveProfile({name: fullname, address: location, phone: mobile, avatar: profile.avatar, dob: birthday })
    ToastAndroid.show("Update profile success ", ToastAndroid.BOTTOM)
  }

  // render button save
  const renderBtnSave = () => {
    return( 
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          marginBottom: 20
        }}>
        {/* Button save */}
        <Pressable  
            style={{
                backgroundColor: COLORS.green,
                height: 60,
                borderRadius: 10,
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
            }}
            onPress = {updateProfile}
            >
            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: "Roboto-regular"}}> Save </Text>
        </Pressable>
      </View>
    )
  }
  
  
  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDateTimePicker(false);
    setBirthday(currentDate);
  }

  const renderDateTimePicker = () => {

    return( 
      <>
          {showDateTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(birthday)}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeDateTime}
          />
        )}
      </>
    )
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{backgroundColor: COLORS.white, flex: 1}}>
        {renderHeader()}
        {renderImage()}
        {renderEditProfile()}
        {renderBtnSave()}
        {renderDateTimePicker()}
      </View>
    );
  }
};

export default EditProfile;

const User = {
  "_id": "61dd7660b4c902001617bf75",
  "email": "nguyen212@gmail.com",
  "createdAt": "2022-01-11T12:21:52.071Z",
  "updatedAt": "2022-01-25T11:38:04.445Z",
  "__v": 0,
  "address": "Quận 3",
  "avatar": "https://firebasestorage.googleapis.com/v0/b/reactnative-2437d.appspot.com/o/s1.jpg?alt=media&token=1c2830bd-9bf3-4432-9693-0e174e72708c",
  "dob": "2000-08-20T00:00:00.000Z",
  "name": "ly tieu long",
  "phone": "029209293"
}

const styles = StyleSheet.create({
  flexRow:{
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: "90%",
    marginHorizontal: 20
  },
  containerTextEdit: {
    width: "90%",
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 15,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: COLORS.lightGray
  }
});
