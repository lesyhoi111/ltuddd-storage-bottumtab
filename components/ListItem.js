
import React, { useContext, useEffect, useState } from 'react';
import Item from './Item';
import { Text, StyleSheet, View, TouchableOpacity, Alert, ScrollView, SafeAreaView,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../config/themeContext'
import  {listData} from '../Data/Data';

function ListItem (props) {
  //const [isLoading, setIsLoading] = useState(false);
  const theme=useContext(themeContext);
  var arrlistfav=[]
  const [itemFav,setItemFav] =useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [idfav,setIdfav]=useState()
  useEffect(()=>{

  })
  const getListFav = async () => {
    //setIsLoading(true);
    let itemsArr = await AsyncStorage.getItem('favourite');
    itemsArr = JSON.parse(itemsArr);
    //setListFav(itemsArr);
    arrlistfav=itemsArr
  };

  const handelAddFav = async id => {
    setIsLoading(true);
    let itemsArr = await AsyncStorage.getItem('favourite');
    itemsArr = JSON.parse(itemsArr);
    if (itemsArr) {
      let arr = itemsArr;
      arr.push(id);
      try {
        await AsyncStorage.setItem('favourite', JSON.stringify(arr));
            
            //setListFav(arr);
            arrlistfav=arr
          setIsLoading(false);
        
      } catch (error) {
        return error;
      }
    } else {
      let arr = [];
      arr.push(id);
      try {
        await AsyncStorage.setItem('favourite', JSON.stringify(arr));
        //setListFav(arr);
        arrlistfav=arr
        
        setIsLoading(false);
      } catch (error) {
        return error;
      }
    }
  };
  const handelRemoveFav = async id => {
    //setIsLoading(true);
    let itemArr =await AsyncStorage.getItem('favourite');
   itemArr = JSON.parse(itemArr);
    if (itemArr) {
      let arr = itemArr;
      for (let index = 0; index < arr?.length; index++) {
        if (arr[index] == id) {
          arr = arr.filter(item => item !== id)
          
            await AsyncStorage.setItem('favourite', JSON.stringify(arr));
          //setListFav(arr);
          arrlistfav=arr
          //arr.splice(index, 1);
          
          return;
        }
        
      }
    }
  };

  // const getItemsInStorageData = async movieId => {
  //   //setIsLoading(true);
  //   let items = await AsyncStorage.getItem('favourite');
  //   items = JSON.parse(items);
  //   if (items) {
  //     for (let index = 0; index < items?.length; index++) {
  //       if (items[index] == movieId) {
  //         console.log(items[index]+'=='+movieId);
  //         console.log(items+ 'getItemsInStorageData');
  //         //setIsLoading(false);
  //       }
  //     }
  //   }
  // };
  const handelAddItemFav =async (id) => {
    let itemsArr = await AsyncStorage.getItem('favourite');
    itemsArr = JSON.parse(itemsArr);
    let removed=false;
    if (itemsArr) {
      itemsArr.forEach(value => {
          if (value == id) {
            handelRemoveFav(id);
            setItemFav(false)
            setIdfav(id);
            removed=true;
            return;
          }
        })
     
      if(!removed){
      handelAddFav(id)
      setItemFav(true)
      setIdfav(id);
      }
    }
    else { 
        handelAddFav(id)
        setItemFav(true)
        setIdfav(id);
         }
  }
  const isFavourited=async (id)=>{
    let itemsArr = await AsyncStorage.getItem('favourite');
    itemsArr = JSON.parse(itemsArr);
    let isitemFavourited=false;
    if (itemsArr) {
      itemsArr.forEach(value => {
          if (value == id) {
            isitemFavourited=true;
          }
        })
    }
    return isitemFavourited;
    };

  return (
    <SafeAreaView flex={1} style={{backgroundColor:theme.background}}>
      <ScrollView >
        <View style={{alignItems:'center', width:'100%'}}>
          <Text style={{fontSize:25,fontWeight:'600',color:theme.color,marginTop:15}}>Product list</Text>
          <Text style={{fontSize:15,fontWeight:'400',color:theme.color,marginBottom:15,alignSelf:'center'}}>ứng dụng chạy khá chậm nên hãy thao tác chậm :)</Text>
     {listData.map((component,index)=><Item key={component.id} id={component.id} image={ component.image}
     name={component.name}
     price={component.price}
     isFavourite={itemFav}
     idFavourite={idfav}
     onPress={()=>{handelAddItemFav(component.id)}}
     isitemFav={false}
     ></Item>)}
     </View>
     </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  
});

export default ListItem;