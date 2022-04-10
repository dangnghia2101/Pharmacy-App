import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native'

import { ProductContext } from '../ProductContext';

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import Icon from "react-native-dynamic-vector-icons";
// import Carousel from '../../../../components/Carousel';
import Swiper from 'react-native-swiper'

// Item product in home
// =====> import { RenderItem} from './ItemHome';

import { COLORS, SIZES, FONTS, images, dummyData } from '../../../../constants'

const Home = (props) => {
    // console.log("Home ", dummyData)

    const { navigation } = props;

    const { windowWidth, windowHeight } = Dimensions.get('window');

    let [fontsLoaded] = useFonts({
        "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
        "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
    });

    const { onGetProducts, getProFile } = useContext(ProductContext);
    const [DataProduct, setDataProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false);



    useEffect(async () => {
        setIsLoading(true)
        const res = await onGetProducts();
        setDataProduct(res);
        setIsLoading(false)
        return () => {
            res;
        }
    }, [])

    // Thông tin cá nhân
    function renderProfile() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: 20
            }}>

                {/* Add money */}

                <View
                    style={{
                        width: "20%",
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                        <Icon name="doctor" type="MaterialCommunityIcons" size={45} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.white, fontFamily: 'Roboto-regular', fontSize: 12 }}>Mr.Doc </Text>
                </View>

                {/* Hello */}
                <View
                    style={{
                        height: 100,
                        justifyContent: 'center',
                    }}>
                    <Text style={{ color: COLORS.white, fontFamily: 'Roboto-regular',  fontSize: 17 }}>Hi Dang, How are you </Text>
                    <Text style={{ color: COLORS.white, fontFamily: 'Roboto-regular',  fontWeight: 'bold', ...FONTS.h3 }}>1.000.000 vnd</Text>
                </View>

                {/* Profile */}
                <View
                    style={{
                        width: '80%',
                        flexDirection: 'row',
                        paddingVertical: 10
                    }}>
                    {/* Image */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: 15
                        }}>
                        <Image
                            source={images.avatar}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 60
                            }}
                        />
                    </View>

                </View>

            </View>
        )
    }

    // banner
    function renderBanner() {
        return (
            <View
                style={{
                    width: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    paddingTop: 20,
                    backgroundColor: COLORS.lightGray,
                }}>
                <Swiper style={{ height: 150 }} autoplay={true} showsPaginatio={true}
                >
                    {
                        dummyData.dummyData.map((item) => {
                            return (

                                <Image source={{ uri: item.url }} style={{ width: windowWidth, height: 150, marginHorizontal: 20, borderRadius: 20 }} />
                            )
                        })
                    }

                </Swiper>
            </View>
        )
    }


    const [selectedId, setSelectedId] = useState(null);
    // render List products Phan bon
    function renderListProduct() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.lightGray,
                }}>
                {/* Title */}
                <View
                    style={{
                        alignItems: 'flex-start',
                        width: "100%",
                    }}>
                    <Text style={{ fontFamily: 'Roboto-Black', fontSize: 22, marginLeft: 15 }}>Medisan</Text>
                </View>

                <FlatList
                    numColumns={2}
                    data={DataProduct}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item._id}
                    extraData={selectedId}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginLeft: -70
                    }}
                >

                </FlatList>

                {/* Watched more */}
                <TouchableOpacity
                    style={{
                        alignItems: 'flex-end',
                        width: '100%',
                        marginEnd: 30,
                        marginVertical: 5
                    }}>
                    <Text style={{ fontSize: 16, color: COLORS.blue1 }}>See more</Text>
                </TouchableOpacity>
            </View>
        )
    }


    // Render items
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? COLORS.lightGray : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => navigation.navigate("DetailProduct", {
                    _id: item._id
                })}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };


    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, { alignItems: 'center' }]}
        >
            <Text style={[styles.title, textColor]}>{item.title}</Text>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: "100%",
                    height: 170,
                    resizeMode: 'contain',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    marginTop: -20
                }}
            />

            <View
                style={{
                    paddingVertical: 10,
                    width: "95%",
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Text style={{ fontFamily: "Roboto-regular", fontSize: 16, color: COLORS.gray }}> $250.000</Text>
                    <Icon name="cart-outline" type="MaterialCommunityIcons" size={20} color={COLORS.gray} />

                </View>
                <Text style={{ fontFamily: "Roboto-regular", fontWeight: 'bold', fontSize: 15, color: COLORS.gray, marginTop: 10 }}> {item.name.slice(0, 15)} </Text>
            </View>
        </TouchableOpacity>
    );

    function renderMain() {
        return (
            <View
                style={{
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                }}>
                {renderBanner()}
                {/* {renderListCayTrong()} */}
                {renderListProduct()}
                {/* {renderListChauCay()} */}
            </View>
        )
    }

    // Footer
    const renderFooter = () => {
        return (
            <View
                style={{
                    backgroundColor: COLORS.lightGray,
                    paddingHorizontal: 20,
                    paddingVertical: 40,
                    flex: 1,
                    height: 270,
                }}>

                <Text style={{ fontFamily: "Roboto-Bold", fontSize: 20, marginBottom: 15 }}> Care Combo (New) </Text>

                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                        
                    <Image source={{ uri: 'https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2019/03/00015100-xich-tho-vuong-lo-60v-9747-5c9b_large.jpg' }}
                            style={{ width: "30%", height: 150, resizeMode: 'cover', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                        />
                    <View
                        style={{
                            backgroundColor: COLORS.blue1,
                            height: 150,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            paddingVertical: 10,
                            width: "37%",
                        }}>
                        <View
                            style={{
                                marginHorizontal: 20,
                                marginVertical: 10
                            }}>
                            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 16 }}>
                                Lemon Balm Grow Kit
                            </Text>

                            <Text style={{ color: COLORS.gray }}>
                                You can grow dozens or even hundreds of new plants to fill your yard and garden with great flavors and bright color for...
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        return (
            <SafeAreaView style={styles.container}>
                {
                    isLoading == true ? <Text> Loading...</Text> :
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            style={{
                                flex: 1,
                                backgroundColor: COLORS.blue1,
                                
                            }}>


                            {renderProfile()}
                            {renderMain()}
                            {renderFooter()}

                        </ScrollView>
                }
            </SafeAreaView>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray
    },
    buttonBanner: {
        backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'
    },
    item: {
        marginHorizontal: 5,
        backgroundColor: COLORS.white,
        width: "36%",
        borderRadius: 5,
        marginVertical: 5
    },
})
