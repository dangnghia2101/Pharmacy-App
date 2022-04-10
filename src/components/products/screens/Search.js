import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Image, Pressable } from 'react-native'

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import { ProductContext } from '../ProductContext';

import Icon from "react-native-dynamic-vector-icons";

import {COLORS, SIZES, FONTS, images} from '../../../../constants'

// const Data = [
//     {
//         "sold": 98,
//         "images": [
//             "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//             "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//         ],
//         "_id": "61d12f0c555401c8610fb8d1",
//         "name": "Ambrosia ambrosioides (Cav.) Payne",
//         "price": 1,
//         "madein": "Indonesia",
//         "quantity": 1547072377,
//         "category": "61d11c4b86511f0016f490ed",
//         "size": "XS",
//         "createdAt": "2021-05-20T00:40:04.000Z",
//         "updatedAt": "2021-02-15T15:54:50.000Z"
//     },
//     {
//         "sold": 50,
//         "images": [
//             "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//             "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//         ],
//         "_id": "61d12f0c555401c8610fb8db",
//         "name": "Spiranthes ×intermedia Ames",
//         "price": 1,
//         "madein": "Ukraine",
//         "quantity": 6311076467,
//         "category": "61d11c4b86511f0016f490ed",
//         "size": "XL",
//         "createdAt": "2021-12-25T22:30:39.000Z",
//         "updatedAt": "2021-06-24T21:18:24.000Z"
//     }
// ]
  
const Search = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState("");
    const {navigation} = props
    const {onSearch} = useContext(ProductContext)
    const [Data, setData] = useState([])
    const [noneSearch, setNoneSearch] = useState(false)



    let [fontsLoaded] = useFonts({
        "Roboto-Black": require('../../../../assets/fonts/Roboto-Black.ttf'),
        "Roboto-regular": require('../../../../assets/fonts/Roboto-Regular.ttf'),
        "Roboto-Bold": require('../../../../assets/fonts/Roboto-Bold.ttf'),
      });

    function renderInputSearch(){
        
        const onChangeText = async (text) => {
            setSearch(text);
            setData(await onSearch(text));
            Data.length > 0 ? setNoneSearch(false):setNoneSearch(true);
        }

        return(
            <View
                style={styles.container_input}
            >

                <Icon name="search" type="EvilIcons" size={30} color={COLORS.darkGray} />

                <TextInput
                    value={search}
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    placeholder="Search"
                    placeholderTextColor = {COLORS.darkGray}
                />
                {/* Click hide/show Password */}
                <TouchableOpacity
                    onPress={() => {setSearch(""), setData([]), setNoneSearch(false)}}
                >
                <Icon style={{marginRight: 20}} name={"clear"} type="MaterialIcons" size={25} color={COLORS.darkGray} />
                </TouchableOpacity>
            </View>
            
        )
    }

    // render products search
    function renderListSearch(data){
        return(
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => Math.random()}
                    extraData={selectedId}
                    showsHorizontalScrollIndicator={false}
                />

            </View>
        )
    }

    // Render items
    const renderItem = ({ item, index }) => {
        const color = item.id === selectedId ? 'white' : 'black';
        return (
            <Item
            item={item}
            onPress={() => navigation.navigate("DetailProduct", {selectedProduct: item})}
            backgroundColor={ index % 2 == 0 ? COLORS.white : COLORS.lightGray}
            textColor={{ color }}
            />
        );
    };

    
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[{paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', backgroundColor: backgroundColor}]}>
            <Image
                source={{uri: item.images[0]}}
                style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain'
                }}
            />
            

            <View
                style={{
                    justifyContent: 'center',
                    paddingnHorizontal: 10,
                    paddingVertical: 10,                  
                }}
                >
                <Text style={{ fontFamily: "Roboto-regular", fontWeight: 'bold', fontSize: 15, color: COLORS.darkGray, marginHorizontal: 10}}> {item.name.slice(0, 15)} </Text>
                <Text style={{color: COLORS.gray, marginHorizontal: 10}}> Giá {item.price}</Text>
                <Text style={{ fontFamily: "Roboto-regular", fontSize: 14, marginHorizontal: 10}}> Còn {item.sold} sản phẩm</Text>
            </View>
        </TouchableOpacity>
    );

    const renderNoneSearch = () => {
        return(
            <View style={[styles.container, {alignItems: "center"}]}>
                <Text>Can't find your keyword</Text>
            </View>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: COLORS.white,
                }}>
                {renderInputSearch()}

                {noneSearch == false ? renderListSearch(Data) : renderNoneSearch()}
            </View>
        )
    }
}

export default Search;


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center', 
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        marginTop: 10,
        paddingTop:20,
        width: '100%'

    },
    input: {
      height: 40,
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
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:20,
        paddingVertical: 10,
        marginTop: 60,
        paddingBottom: 10,

      },
  })
  

