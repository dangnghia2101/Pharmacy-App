import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'



const RenderItem = ({item}) => {

    console.log(item)
    const [selectedId, setSelectedId] = useState(null);
        
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, {borderBottomWidth: 5, borderBottomColor: COLORS.lightGray, alignItems: 'center'}]}>
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
                    borderBottomLeftRadius: 20
                    
                }}
                >
                <Text style={{ fontFamily: "Roboto-regular", fontWeight: 'bold', fontSize: 15, color: 'white', marginHorizontal: 10}}> {item.name.slice(0, 15)} </Text>
                <Text style={{color: COLORS.lightGray, marginHorizontal: 10}}> Ưa bóng</Text>
                <Text style={{ fontFamily: "Roboto-regular", fontSize: 15, color: "#efd210", marginHorizontal: 10}}> 250.000 vnd</Text>
            </View>
        </TouchableOpacity>
    );


    const backgroundColor = item.id === selectedId ? COLORS.lightGray : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );

}

export default RenderItem
