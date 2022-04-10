import React, {useState} from 'react'
import { 
    StyleSheet, 
    Text, 
    View ,
    Pressable, 
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ScrollView,
    SafeAreaView 
} from 'react-native'

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import Icon from "react-native-dynamic-vector-icons";

import {COLORS, SIZES, FONTS, images, dummyData, DataProduct} from '../../../../constants'

const MoreProduct = (props) => {
    const { navigation } = props;

    const {windowWidth, windowHeight} = Dimensions.get('window');

    let [fontsLoaded] = useFonts({
        "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
        "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
      });

    // Phần đầu ứng dụng
    const renderHeader = () => {
        return(
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 60,
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    flex: 1
                }}>

                {/* Return home */}
                <Pressable
                    onPress={() => navigation.navigate("Home")}>
                    <Icon name="chevron-back" type="Ionicons" size={30} color={COLORS.gray} />
                </Pressable>

                <Text style={{color:COLORS.gray, fontFamily: 'Roboto-Bold', fontSize: 20}}> PLANTS</Text>
                <Icon name="shoppingcart" type="AntDesign" size={30} color={COLORS.gray} />


            </View>
        )
    }

    // Render List product
    const [selectedId, setSelectedId] = useState(null);
    function renderListProduct(){
        return(
            <View
                style={{ 
                    flex: 9,
                    width: "100%"
                }}>

                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-around',
                    }}
                    data={DataProduct.data[0].products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    extraData={selectedId}
                    showsHorizontalScrollIndicator={false}
                >
                
                </FlatList>
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
            // onPress={() => navigation.navigate("DetailProduct", {
            //     selectedProduct: item,
            // })} 
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
      };

    
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, {borderBottomWidth: 5, borderBottomColor: COLORS.lightGray, alignItems: 'center', justifyContent: 'center'}]}
            >
            <Text style={[styles.title, textColor]}>{item.title}</Text>
            <Image
                source={{uri: item.images[0]}}
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain'
                }}
            />
            
            <View
                style={{
                    height: 10,
                    width: 100,
                    backgroundColor: "#735e41"
                }}>

            </View>

            <View
                style={{
                    justifyContent: 'center',
                    paddingnHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: COLORS.green,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,

 
                    
                }}
                >
                <Text style={{ fontFamily: "Roboto-regular", fontWeight: 'bold', fontSize: 15, color: 'white', marginHorizontal: 10}}> {item.name.slice(0, 15)} </Text>
                <Text style={{color: COLORS.lightGray, marginHorizontal: 10}}> Ưa bóng</Text>
                <Text style={{ fontFamily: "Roboto-regular", fontSize: 15, color: "#efd210", marginHorizontal: 10}}> 250.000 vnd</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderListProduct()}
        </View>
    );
};

export default MoreProduct;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonBanner: {
        backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'
    },
    item: {
        marginHorizontal: 10,
      },
});
