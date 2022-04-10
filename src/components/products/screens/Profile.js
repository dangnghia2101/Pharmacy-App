import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, Switch, TouchableOpacity, Pressable, ScrollView, Image, TextInput } from 'react-native'

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import {COLORS, SIZES, FONTS, images, dummyData, DataProduct} from '../../../../constants'

import Icon from "react-native-dynamic-vector-icons";

const Profile = (props) => {
    const { navigation } = props;


    let [fontsLoaded] = useFonts({
        "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
        "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
      });


    const renderHeader = () => {
        return(
            <View
                style={{
                    backgroundColor: COLORS.green,
                    height: 250,

                }}>
                <Image source={images.bgProfile} style={{ height: 250, width: '100%', resizeMode: 'cover' }}/>
            </View>
        )
    }

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // Detail
    const renderMain = () => {
        return(
            <View style={{ marginTop: 20}}>
                <View style={styles.container_input}>
                    <Icon name="payment" type="MaterialIcons" size={30} color={COLORS.darkGray} />
                    <Text style={{ fontFamily: "Roboto-regular", marginLeft: 20, fontSize: 16}}>Payment Methods</Text>
                </View>

                <View style={styles.container_input}>
                    <Icon name="notifications-none" type="MaterialIcons" size={30} color={COLORS.darkGray} />
                    <Text style={{ fontFamily: "Roboto-regular", marginLeft: 20, fontSize: 16, width: '65%'}}>Notifications</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#2cd364" }}
                        thumbColor={isEnabled ? COLORS.white : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <View style={styles.container_input}>
                    <Icon name="notebook" type="SimpleLineIcons" size={30} color={COLORS.darkGray} />
                    <Text style={{ fontFamily: "Roboto-regular", marginLeft: 20, fontSize: 16}}>Note Books</Text>
                </View>

                <Pressable style={styles.container_input}
                    onPress={() => navigation.navigate("CartHistory")}>
                    <Icon name="history" type="MaterialIcons" size={30} color={COLORS.darkGray} />
                    <Text style={{ fontFamily: "Roboto-regular", marginLeft: 20, fontSize: 16}}>History</Text>
                </Pressable>
                
                <View style={styles.container_input}>
                    <Icon name="logout" type="MaterialIcons" size={30} color={COLORS.darkGray} />
                    <Text style={{ fontFamily: "Roboto-regular", marginLeft: 20, fontSize: 16}}>Logout</Text>
                </View>
            </View>
        )
    }

    // render detail person
    const renderDetail = () => {
        return(
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '100%',
                }}>
      
                    <Image 
                        source={{uri: User.avatar}}
                        style={{
                            width: 120,
                            height: 120,
                            marginTop: 185,
                            borderRadius: 20,
                        }}
                    />
                    <Text style={{ fontFamily: "Roboto-Black", fontSize: 20, marginTop: 20, color: COLORS.gray}}> { User.name } </Text>
                    <Text style={{ fontFamily: "Roboto-regular", fontSize: 14}}>{ User.email }</Text>

            </View>
        )
    }

    // renderOption
    const renderOption = () => {
        return(
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 140,
                    marginHorizontal: 50
                }}>
                <View
                    style={styles.boxOption}>
                    <Icon name="pie-chart" type="SimpleLineIcons" size={25} color={COLORS.green} />

                </View>

                <View
                    style={styles.boxOption}>
                    <Icon name="security" type="MaterialIcons" size={25} color={COLORS.green} />

                </View>

                <View
                    style={styles.boxOption}>
                    <Icon name="profile" type="AntDesign" size={25} color={COLORS.green} />

                </View>

                <Pressable
                    style={styles.boxOption}
                    onPress={() => navigation.navigate("EditProfile")}>
                    <Icon name="dots-horizontal-circle-outline" type="MaterialCommunityIcons" size={25} color={COLORS.green} />
                </Pressable>
            </View>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: "#F5F5F5",
                position: "relative"
            }}>
                {renderHeader()}
                {renderDetail()}
                {renderOption()}
                {renderMain()}
            </ScrollView>
        )
    }
}

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

export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },  
    input: {
        height: 60,
        marginHorizontal: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        color: COLORS.darkGray,
        flex: 1,
        fontSize: 16,
        fontFamily: "Roboto-regular",
      },
      button:{
        height: 55,
        backgroundColor: COLORS.green,
        borderRadius: 10,
        color: COLORS.white,
        flex: 1,
        fontFamily: "Roboto-regular",
        justifyContent: 'center',
        alignItems: 'center',
      },
      container_input: {
          marginHorizontal: 20,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          marginVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft:20,
          paddingVertical: 10,
          height: 60,
        },
    boxOption: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
