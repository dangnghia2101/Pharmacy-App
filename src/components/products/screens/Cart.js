import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Pressable, ScrollView, Image, Modal, ToastAndroid } from 'react-native'

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

import { ProductContext } from '../ProductContext'

import Icon from "react-native-dynamic-vector-icons";

// const cart = [
//     {
//         product:{
//             "sold": 90,
//             "images": [
//                 "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                 "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//             ],
//             "_id": "61d12d14555401c8610cfa3b",
//             "name": "Eucalyptus delegatensis R.T. Baker",
//             "price": 2,
//             "madein": "Indonesia",
//             "quantity": 3801758691,
//             "category": "61d11bf386511f0016f490c9",
//             "size": "3XL",
//             "createdAt": "2021-03-25T23:21:45.000Z",
//             "updatedAt": "2021-10-07T08:02:19.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: true,
//     },
//     {
//         product:{
//             "sold": 90,
//             "images": [
//                 "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                 "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//             ],
//             "_id": "61d12d14555401c8610cfa3b",
//             "name": "Eucalyptus delegatensis R.T. Baker",
//             "price": 2,
//             "madein": "Indonesia",
//             "quantity": 3801758691,
//             "category": "61d11bf386511f0016f490c9",
//             "size": "3XL",
//             "createdAt": "2021-03-25T23:21:45.000Z",
//             "updatedAt": "2021-10-07T08:02:19.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: false,
//     },
//     {
//         product:{
//             "sold": 90,
//             "images": [
//                 "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                 "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//             ],
//             "_id": "61d12d14555401c8610cfa3b",
//             "name": "Eucalyptus delegatensis R.T. Baker",
//             "price": 2,
//             "madein": "Indonesia",
//             "quantity": 3801758691,
//             "category": "61d11bf386511f0016f490c9",
//             "size": "3XL",
//             "createdAt": "2021-03-25T23:21:45.000Z",
//             "updatedAt": "2021-10-07T08:02:19.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: false,
//     },
//     {
//         product:{
//             "sold": 90,
//             "images": [
//                 "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                 "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//             ],
//             "_id": "61d12d14555401c8610cfa3b",
//             "name": "Eucalyptus delegatensis R.T. Baker",
//             "price": 2,
//             "madein": "Indonesia",
//             "quantity": 3801758691,
//             "category": "61d11bf386511f0016f490c9",
//             "size": "3XL",
//             "createdAt": "2021-03-25T23:21:45.000Z",
//             "updatedAt": "2021-10-07T08:02:19.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: false,
//     },
//     {
//         product:{
//             "sold": 90,
//             "images": [
//                 "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                 "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//             ],
//             "_id": "61d12d14555401c8610cfa3b",
//             "name": "Eucalyptus delegatensis R.T. Baker",
//             "price": 2,
//             "madein": "Indonesia",
//             "quantity": 3801758691,
//             "category": "61d11bf386511f0016f490c9",
//             "size": "3XL",
//             "createdAt": "2021-03-25T23:21:45.000Z",
//             "updatedAt": "2021-10-07T08:02:19.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: false,
//     },
//     {
//         product:{
//             "sold": 90,
//             "images": [
//                 "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                 "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//             ],
//             "_id": "61d12d14555401c8610cfa3b",
//             "name": "Eucalyptus delegatensis R.T. Baker",
//             "price": 2,
//             "madein": "Indonesia",
//             "quantity": 3801758691,
//             "category": "61d11bf386511f0016f490c9",
//             "size": "3XL",
//             "createdAt": "2021-03-25T23:21:45.000Z",
//             "updatedAt": "2021-10-07T08:02:19.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: false,
//     }

// ]

import {COLORS, SIZES, FONTS, images} from '../../../../constants'

// Buy product
const CheckoutModal = (props) => {
    const { isShowModal, setIsShowModal } = props

    const { onSaveCart } = useContext(ProductContext)

    const checkout = async () => {
        await onSaveCart();
        ToastAndroid.show("Buy success ", ToastAndroid.BOTTOM)
        setIsShowModal(false);
    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowModal}

        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={{fontFamily: "Roboto-regular", ...FONTS.body3}}> Xác nhận thanh toán </Text>
                    {/* Confirm Button */}
                    <Pressable  
                        style={{
                            backgroundColor: COLORS.green,
                            height: 60,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            marginTop: 20
                        }}
                        onPress = {checkout}
                        >
                        <Text  style={{ color: COLORS.white, fontSize: 18, fontFamily: "Roboto-regular"}}> Confirm </Text>
                    </Pressable>
                    <Text onPress={() => setIsShowModal(false)} style={{borderBottomWidth: 1, borderBottomColor: COLORS.darkGray, marginTop: 5}}>Cancel</Text>
                </View>
            </View>
        </Modal>
    )
}

// Delete product
const DeleteModal = (props) => {
    const { isShowDeleteModal, setIsShowDeleteModal } = props

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowDeleteModal}

        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={{fontFamily: "Roboto-regular", ...FONTS.body3}}> Do you want delete all product</Text>
                    {/* Confirm Button */}
                    <Pressable  
                        style={{
                            backgroundColor: COLORS.green,
                            height: 60,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            marginTop: 20
                        }}
                        >
                        <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: "Roboto-regular"}}> Yes, I'm sure </Text>
                    </Pressable>
                    <Text onPress={() => setIsShowDeleteModal(false)} style={{borderBottomWidth: 1, borderBottomColor: COLORS.darkGray, marginTop: 5}}>Cancel</Text>
                </View>
            </View>
        </Modal>
    )
}


const Cart = (props) => {

    const {navigation} = props
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

    const { onGetAllCart, updateCart, cart } = useContext(ProductContext);

    //   }, []);   

    console.log("cart: " + cart + " ")


    let [fontsLoaded] = useFonts({
        "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
        "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
    });

    const isShowCheckout = () => {
        const items = cart.filter(item => item.checked == true) || [];
        let total = 0;
        cart.map(item => {
            total += item.price * item.quantity;
        })
        return {isShown: items.length > 0, total: total};
    }

    // render information header products
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
                    >
                    <Icon name="chevron-back" type="Ionicons" size={30} color={COLORS.darkGray}/>
                </Pressable>

                <Text style={{ fontFamily: "Roboto-regular", fontSize: 22, fontWeight: "bold" }}>Cart</Text>

                
                <Pressable
                    style={{
                        borderRadius: 50,
                        height: 45,
                        width: 45,
                        justifyContent: 'center', 
                        alignItems: 'center',
                    }}
                    onPress={() => setIsShowDeleteModal(true)}
                    >
                    <Icon name="delete" type="AntDesign" size={30} color={COLORS.darkGray}/>
                </Pressable>

            </View>
        )
    }

    // Button buy
    const renderBuy = () => {

        return(
            <View style={{width: "100%", position: "absolute", bottom: 0, backgroundColor: COLORS.white, height: 70}}>
                {/* Tạm tính */}
                <View
                    style={styles.flexRow}>
                    <Text>Tạm tính</Text>
                    <Text style={{...FONTS.body2, fontFamily: "Roboto-Bold", color: COLORS.darkGray, marginRight: 10}}>$ {isShowCheckout().total}</Text>
                </View>

                {/* Button buy */}
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
                    onPress = {() => setIsShowModal(true)}
                   >
                    <Text  onPress = {() => setIsShowModal(true)} style={{ color: COLORS.white, fontSize: 20, fontFamily: "Roboto-regular"}}> Buy Now </Text>
                </Pressable>
            </View>
        )
    }
    // render Cart 
    function renderListCart(){
        // Render items
        
        const onNumberChange = (isAdd) => {
            if(isAdd == true) {
                setNumber(number + 1);
            }else if(isAdd == false) {
                setNumber(number - 1);
            }
        }

        const renderItem = ({ item }) => {

            return (
                <View style={[{marginVertical: 20, alignItems: 'center', flexDirection: 'row', width: '92%', backgroundColor: "#F5F5F5", marginHorizontal: 10, paddingVertical: 10, borderRadius: 10, position: 'relative'}, styles.shadow]}>
                    <Image
                        source={{uri: item.product.images[0]}}
                        style={{
                            width: "30%",
                            height: 80,
                            resizeMode: 'contain',
                            borderRadius: 40,
                            marginLeft: 20
                        }}
                    />

                    <View style={{position: 'absolute', left: 10, top: 10}}>
                        {/* Click item choose*/}
                        <Pressable
                            >
                            <Icon style={{marginRight: 20}} name={item.checked ? "radio-button-on":"radio-button-off-sharp"} type="Ionicons" size={25} color={COLORS.green} />
                        </Pressable>
                    </View>
                    
                            
                    <View
                        style={{
                            paddingnHorizontal: 10,
                            width: "60%",
                            height: 100  
                        }}
                        >
                        <Text style={{ fontFamily: "Roboto-regular", fontWeight: 'bold', fontSize: 15, color: COLORS.darkGray, marginHorizontal: 10}}> {item.product.name.slice(0, 15)} </Text>
                        <Text style={{color: COLORS.gray, marginHorizontal: 10, marginVertical: 5}}> {item.product.madein}</Text>
                        <Text style={{ fontFamily: "Roboto-Bold", fontSize: 13, marginHorizontal: 10}}> $ {item.price}</Text>

                        {/* Change number product */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 10,
                                marginTop: 5
                            }}>

                            <TouchableOpacity
                                onPress = {() => updateCart(item.product, item.price, item.quantity - 1, true)}>
                                <Icon name="ios-remove-circle-outline" type="Ionicons" size={30} color={COLORS.gray}/>
                            </TouchableOpacity>   

                            <Text style={{ fontSize: 18, marginHorizontal: 20, alignItems: 'center'}}> {item.quantity}</Text>

                            <TouchableOpacity
                                onPress = {() => updateCart(item.product, item.price, item.quantity + 1, true)}>
                                <Icon name="ios-add-circle-outline" type="Ionicons" size={30} color={COLORS.gray}/>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
                
            );
        };


        return(
            <View style={[styles.container, isShowCheckout().isShown == true ? {height: "80%"}: {height: "100%"}]}>
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={item => Math.random()}
                />
            </View>
        )
    }

    // While data empty
    const renderListEmty = () => {
        return(
            <View   style={{ justifyContent: 'center', alignItems: 'center', color: COLORS.darkGray, height: "80%"}}>
                <Text> Your cart empty </Text>
            </View>
        )
    }
    
     if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View
                contentContainerStyle={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    position: 'relative',
                }}>
                {renderHeader()}
                { cart.length == 0 ? renderListEmty():renderListCart()}
                {isShowCheckout().isShown == true ? renderBuy(): <></>}
                <CheckoutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
                <DeleteModal isShowDeleteModal={isShowDeleteModal} setIsShowDeleteModal={setIsShowDeleteModal}/>
            </View>
        )
    }
}

export default Cart;

const styles = StyleSheet.create({
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
    flexRow:{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "90%",
        marginHorizontal: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        height: 200
    },
})
