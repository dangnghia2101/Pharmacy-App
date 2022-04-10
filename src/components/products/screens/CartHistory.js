import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import React from 'react';

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

import Icon from "react-native-dynamic-vector-icons";

import {COLORS, SIZES, FONTS, images} from '../../../../constants'

const CartHistory = (props) => {
  const {navigation} = props;

  const displayDay = (day) => {
      switch (day) {
          case 0: return "Sunday"
          case 1: return "Monday"
          case 2: return "Tuesday"
          case 3: return "Wednesday"
          case 4: return "Thusday"
          case 5: return "Friday"
          case 6: return "Saturday"
      }
  }

  const displayTime = (time) => {
      time = new Date(time)
      const day = displayDay(time.getDay())
      const date = time.getDate() < 10 ? "0" + time.getDate(): time.getDate()
      const month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1):(time.getMonth() + 1)
      const year = time.getFullYear()
      return `${day}, ${date}/${month}/${year}`
  }
 
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

            <Text style={{ fontFamily: "Roboto-regular", fontSize: 22, fontWeight: "bold", marginHorizontal: '29%' }}>History</Text>

        </View>
    )
  }


  // render Cart 
  function renderListCart(){

    // Render items
    const renderItem = ({ item }) => {
      const { createdAt, total, products, status } = item
    
      return (
          <View style={[{marginVertical: 20, alignItems: 'center', flexDirection: 'row', width: '92%', backgroundColor: "#F5F5F5", marginHorizontal: 10, paddingVertical: 10, borderRadius: 10}, styles.shadow]}>
              <Image
                  source={{uri: "http://localhost"}}
                  style={{
                      width: "30%",
                      height: 80,
                      resizeMode: 'contain',
                      borderRadius: 40,
                      marginLeft: 20
                  }}
              />
                      
              <View
                  style={{
                      paddingnHorizontal: 10,
                      width: "60%",
                      height: 100  
                  }}
                  >
                  <Text style={styles.date}> { displayTime(createdAt) } </Text>
                  <Text style={{color: COLORS.green, marginHorizontal: 9, marginVertical: 5}}> Trạng thái: { status }</Text>
                  <Text style={{ fontFamily: "Roboto-Bold", fontSize: 13, marginHorizontal: 10}}> Tổng sản phẩm { products.length }</Text>
                  <Text style={{ fontFamily: "Roboto-Bold", fontSize: 13, marginHorizontal: 10}}> Tổng tiền: { total }</Text>

              </View>
          </View>
            
        );
    };


    return(
        <View style={[styles.container, {height: "100%"}]}>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => Math.random()}
            />
        </View>
    )
}
  

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      {renderHeader()}
      {renderListCart()}
    </View>
  );
};

export default CartHistory;

const Data = [
  {
      "_id": "61f113f61165d80016646864",
      "user": "61dd7660b4c902001617bf75",
      "status": "Đã giao hàng",
      "total": 13,
      "products": [
          {
              "_id": "61f113f61165d80016646865",
              "product": "61d12f0c555401c8610fb8d1",
              "quantity": 2,
              "price": 1
          },
          {
              "_id": "61f113f61165d80016646866",
              "product": "61d12f0c555401c8610fb8d2",
              "quantity": 2,
              "price": 1
          },
          {
              "_id": "61f113f61165d80016646867",
              "product": "61d12f0c555401c8610fb8d3",
              "quantity": 3,
              "price": 3
          }
      ],
      "createdAt": "2022-01-26T09:27:18.750Z",
      "updatedAt": "2022-01-29T09:11:30.601Z"
  },
  {
    "_id": "61f113f61165d80016646864",
    "user": "61dd7660b4c902001617bf75",
    "status": "Đã hủy đơn hàng",
    "total": 13,
    "products": [
        {
            "_id": "61f113f61165d80016646865",
            "product": "61d12f0c555401c8610fb8d1",
            "quantity": 2,
            "price": 1
        },
        {
            "_id": "61f113f61165d80016646866",
            "product": "61d12f0c555401c8610fb8d2",
            "quantity": 2,
            "price": 1
        },
        {
            "_id": "61f113f61165d80016646867",
            "product": "61d12f0c555401c8610fb8d3",
            "quantity": 3,
            "price": 3
        }
    ],
    "createdAt": "2022-01-26T09:27:18.750Z",
    "updatedAt": "2022-01-29T09:11:30.601Z"
}
]

const styles = StyleSheet.create({
  flexRow:{
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: "90%",
    marginHorizontal: 20
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    
  },
  item: {
      marginHorizontal: 10,
    },
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.30,
      elevation: 13,
  },
  date: {
    fontFamily: "Roboto-regular", 
    fontWeight: 'bold', fontSize: 15, 
    color: COLORS.darkGray, 
    marginHorizontal: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray
  }

});
