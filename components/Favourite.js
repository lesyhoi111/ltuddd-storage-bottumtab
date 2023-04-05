
import React, { useContext, useEffect, useState } from 'react';
import Item from './Item';
import { Text, StyleSheet, View, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FavouriteId=[1]
import themeContext from '../config/themeContext'

import  {listData} from '../Data/Data';

function Favourite (props) {
  const {navigation,route}=props
  const {navigate,goBack}=navigation
  const theme=useContext(themeContext);
  const [listFav,setListFav]=useState()
  useEffect(()=>{   
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);
 
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('favourite');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      listData.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setListFav(productData);
    } else {
      setListFav(false);
    }
  };

  const renderProducts = (data, index) => {
    return (
      <Item key={data.id} id={data.id} image={ data.image}
     name={data.name}
     price={data.price}
     isFavourite={()=>{}}
     onPress={() =>{}}
     isitemFav={true}
     ></Item>
    )};

  // const isFavourited=async (id)=>{
  //   let itemsArr = await AsyncStorage.getItem('favourite');
  //   itemsArr = JSON.parse(itemsArr);
  //   console.log(listFav)
  //   let isitemFavourited=false;
  //   if (listFav) {
  //     listFav.forEach(value => {
  //         if (value == id) {
  //           console.log("true")
  //           isitemFavourited=true;
  //         }
  //       })
  //   }
  //   return isitemFavourited;
  //   };
  return (
    <SafeAreaView flex={1} style={{backgroundColor:theme.background}}>
      <ScrollView >
        <View style={{alignItems:'center', width:'100%'}}>
          <Text style={{fontSize:25,fontWeight:'600',color:theme.color,margin:15}}>Favourites</Text>
          {listFav ? listFav.map(renderProducts) : null}
     </View>
     </ScrollView>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btn: {
    backgroundColor: 'blue',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20

  },
  txtbtn: {
    fontSize: 27,
    fontWeight: 600,
    color: 'white'
  },
});

export default Favourite;