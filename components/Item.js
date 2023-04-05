import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, Touchable, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import themeContext from '../config/themeContext'
import  {listData} from '../Data/Data';

function Item(props) {
  const theme=useContext(themeContext);
  const [itemFav,setItemFav] =useState(false)
  const [listItemFav,setListItemFav] =useState([])

  useEffect(()=>getDataFromDB)

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('favourite');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      listData.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data.id);
          return;
        }
      });
      setListItemFav(productData);
    } else {
      setListItemFav(false);
    }
  };

  return (
    <TouchableOpacity style={[styles.container,{borderColor:theme.color,}]} flex={1}>
      <View flex={1.4} style={{margin:1}}>
        <Image
          style={styles.images}
          source={{ uri: props.image }}
          resizeMode='stretch'></Image>
      </View >
      <View flex={2}  style={{marginLeft:20}}>
        <Text style={[styles.text,{color:theme.color}]}>{props.name}</Text>
        <Text style={[styles.text,{color:'red'}]}>{props.price}</Text>
      </View>
      {props.isitemFav==true?<View flex={0.5}></View>:
      <View flex={0.5} style={{}}>
        <TouchableOpacity onPress={props.onPress}>
          <MaterialCommunityIcons name='cards-heart' size={30} color={listItemFav.includes(props.id) ? 'green':'red'}></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 50,
    borderRadius: 10,
    borderColor:'black',
    borderWidth:1,
    width: 300,
    flexDirection: 'row',
    height: 110,
  },
  images: {
    height: 100,
    borderRadius:10,

  },
  text: {
    fontSize: 25,
    color: '#333',
    marginBottom:10
  }
});

export default Item;
