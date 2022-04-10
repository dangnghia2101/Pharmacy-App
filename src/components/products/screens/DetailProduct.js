import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import Swiper from 'react-native-swiper'

import {COLORS, SIZES, FONTS, images, dummyData, DataProduct} from '../../../../constants'

import { useFonts } from 'expo-font';
import Icon from "react-native-dynamic-vector-icons";

import { ProductContext } from '../ProductContext'

const PartialView = (props) => {
    const { price, selectedProduct, product} = props;

    const { getCart, updateCart } = useContext(ProductContext);


    const getQuantity = () => {
        if(getCart().length == 0){
            return 0;
        }
        let item = getCart().filter(i => i.product._id == product._id);

        if(item.length == 0){
            return 0;
        }
        return item[0].quantity
    }

    const [numProduct, setNumProduct] = useState(getQuantity)

    const onUpdateCart = () => {
        updateCart(product, price, numProduct, true)
        ToastAndroid.show("Add product success", ToastAndroid.BOTTOM)
    }

    // click change number product
    const onNumberChange = (isAdd) => {
        if(isAdd){
            setNumProduct(numProduct + 1);
        }else if(numProduct > 0){
            setNumProduct(numProduct - 1)
        }
    }

    
    // detail product
    const renderDetailProduct = () => {
        return(
            <View
                style={{
                    backgroundColor: COLORS.white,
                    height: 160,
                    marginTop: 2,
                    paddingTop: 10,
               
                }}>

                {/* Size */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 13
                    }}>
                    <Text style={{ fontFamily: "Roboto-regular",  fontSize: 15, marginHorizontal: 20}}> Size </Text>
                    <Text style={{ fontFamily: "Roboto-regular",  fontSize: 14, marginHorizontal: 40}}> { selectedProduct.size}</Text>
                </View>

                {/* Madein */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 13
                    }}>
                    <Text style={{ fontFamily: "Roboto-regular",  fontSize: 15, marginHorizontal: 20}}> Madein </Text>
                    <Text style={{ fontFamily: "Roboto-regular",  fontSize: 14, marginHorizontal: 18}}> {selectedProduct.madein} </Text>
                </View>

                {/* Sold */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 13
                    }}>
                    <Text style={{ fontFamily: "Roboto-regular",  fontSize: 15, marginHorizontal: 20}}> Sold </Text>
                    <Text style={{ fontFamily: "Roboto-regular",  fontSize: 14, marginHorizontal: 37}}> {selectedProduct.sold} products left</Text>
                </View>
 
            </View>
        )
    }

    // Add to cart
    const renderAddToCart = () => {
        return (
            <View
                style={{
                    height: 180,
                    backgroundColor: COLORS.white,
                    marginTop: 10
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 20,
                        marginTop: 20
                    }}>
                    <Text> Đã chọn 1 sản phẩm </Text>
                    <Text> Tạm tính </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 20,
                        marginTop: 5
                    }}>
                    {/* Change number product */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>

                        <TouchableOpacity
                            onPress = {() => onNumberChange(false)}>
                            <Icon name="ios-remove-circle-outline" type="Ionicons" size={30} color={COLORS.gray}/>
                        </TouchableOpacity>   

                        <Text style={{ fontSize: 18, marginHorizontal: 20 }}> {numProduct}</Text>

                        <TouchableOpacity
                            onPress = {() => onNumberChange(true)}>
                            <Icon name="ios-add-circle-outline" type="Ionicons" size={30} color={COLORS.gray}/>
                        </TouchableOpacity>
                        
                    </View>

                    <Text style={{ fontSize: 22, fontFamily: "Roboto-regular"}}> {price * numProduct}</Text>
                </View>

                <Pressable  
                    style={{
                        backgroundColor: numProduct > 0 ? COLORS.blue1: COLORS.lightGray,
                        height: 60,
                        borderRadius: 20,
                        marginHorizontal: 20,
                        marginVertical: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress = {onUpdateCart}>
                    <Text style={{ color: COLORS.white, fontSize: 20, fontFamily: "Roboto-regular"}}> Buy Now </Text>
                </Pressable>
            </View>
        )
    }

    return(
        <>
            { renderDetailProduct()}
            {renderAddToCart()}
        </>
    )
}

const DetailProduct = (props) => {
    const {windowWidth, windowHeight} = Dimensions.get('window');
    const { navigation, route: {params: {_id}} } = props;

    const [selectedProduct, setSelectedProduct] = useState(null);

    const { onGetProductById, product } = useContext(ProductContext);

    useEffect(async () => {
      const res = await onGetProductById(_id)
      setSelectedProduct(res)
      return () => {
          res
      };
    }, []);    

    let [fontsLoaded] = useFonts({
        "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
        "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
      });

    // render information header products
    const renderHeader = () => {
        return(
            <View
                style={{
                    backgroundColor: COLORS.white,
                    height: 600,
                    position: 'relative'
                }}>
                { renderImages()}

                <Pressable
                    style={{
                        backgroundColor: COLORS.blue1,
                        borderRadius: 50,
                        height: 45,
                        width: 45,
                        position: 'absolute',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        right: 20,
                        marginTop: 45
                    }}
                    onPress = {() => navigation.navigate("Cart")}>
                    <Icon name="shoppingcart" type="AntDesign" size={30} color={COLORS.white}/>
                </Pressable>

                <Pressable
                    style={{
                        backgroundColor: COLORS.blue1,
                        borderRadius: 50,
                        height: 45,
                        width: 45,
                        position: 'absolute',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        left: 20,
                        marginTop: 45
                    }}
                    onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" type="Ionicons" size={30} color={COLORS.white}/>
                </Pressable>
            </View>
        )
    }

    // render Images products
    const renderImages = () =>{
        return(
            <View
            style={{
                width: '100%',
                justifyContent: 'center',
                
                height: 600,
                marginTop: 20
            }}>
                {/* <Swiper style={{height: 400}} showsPaginatio={true}
                    >
                    {
                        selectedProduct.images.map((item) => {
                            return(
                                <Image source={{uri: item}} style={{width: windowWidth, height: 400}}/>
                            )
                        })
                    }
            
                </Swiper> */}

                <Image source={{uri: selectedProduct.image}} style={{width: windowWidth, height: 400}}/>


                {/* Name product */}
                <Text style={{ fontFamily: "Roboto-regular", fontWeight: "bold", fontSize: 16, marginHorizontal: 20, color: COLORS.gray1 }}> {selectedProduct.name} </Text>
                <Text style={{ fontFamily: "Roboto-regular", fontSize: 19, marginHorizontal: 20, color: COLORS.primary, marginTop: 15 }}> đ{selectedProduct.price * 20000} </Text>
                <Text style={{ fontFamily: "Roboto-regular",  fontSize: 15, marginHorizontal: 20, color: COLORS.gray, textDecorationLine: 'line-through' }}> đ456.000 </Text>
                
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: 40,
                        marginHorizontal: 20,
                        marginVertical: 20,
                        alignItems: 'center'
                    }}>
                    <Icon name="star" type="FontAwesome" size={20} color={"#fdef02"} />
                    <Icon name="star" type="FontAwesome" size={20} color={"#fdef02"} />
                    <Icon name="star" type="FontAwesome" size={20} color={"#fdef02"} />
                    <Icon name="star" type="FontAwesome" size={20} color={"#fdef02"} />
                    <Icon name="star" type="FontAwesome" size={20} color={"#fdef02"} />

                    <Text style={{ marginHorizontal: 10}}>4.9</Text>
                    <Text style={{ color: COLORS.lightGray, fontSize: 22}}>|</Text>
                    <Text style={{ marginHorizontal: 10}}> Sold 256</Text>

                    <Icon name="hearto" type="AntDesign" size={25} color={COLORS.gray} style={{ marginStart: 80}}/>

                </View>
            </View>
        )
    }

    if(!selectedProduct){
        return (<></>)  
    }
   

    return (
        <ScrollView 
      >
            { renderHeader()}
            <View
                style={{
                    backgroundColor: COLORS.white,
                    height: 45,
                    marginTop: 10,
                    paddingTop: 10,
                    flexDirection: 'row',
                }}>
                <Text style={{ fontFamily: "Roboto-Bold",  fontSize: 15, marginHorizontal: 20, color: COLORS.darkGray}}> Detail product</Text>
                <Icon name="clockcircleo" type="AntDesign" size={20} color={COLORS.gray}/>
                <Text style={{ fontFamily: "Roboto-regular",  fontSize: 14, marginHorizontal: 5}}> 4 months</Text>
            </View>
            <PartialView price={selectedProduct.price} size={selectedProduct.size} madein={selectedProduct.madein} quantity={selectedProduct.quantity} selectedProduct={selectedProduct} product={selectedProduct}/>

        </ScrollView>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,

      
    },
})
