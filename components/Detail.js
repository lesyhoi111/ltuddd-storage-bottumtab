import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, Touchable, TouchableOpacity} from 'react-native';
import Item from './Item'
const Detail = (props) => {
  const {navigation,route}=props
  return (
    <View style={styles.container} onPress={props.onPress}>
        {/* <Image
        style={styles.images} 
        source={{uri:props.url}}
        resizeMode='stretch'></Image>
        <View style={{width:'100%', justifyContent:'center',alignItems:'center',paddingVertical:10}}><Text style={styles.text}>{props.name}</Text></View>
        <View flex={1}></View>
        <TouchableOpacity style={styles.btn} onPress={props.onPress}>
        <Text style={styles.txtbtn}>Back</Text>
        </TouchableOpacity> */}
        <View style={{alignItems:'center'}}>
          <Text style={[styles.text,{fontWeight:'bold',marginVertical:30}]}>Detail</Text>
        <Item key={route.params.id} image={ route.params.image}
     name={route.params.name}
     price={route.params.price}
     ></Item>
     </View>
     <View style={{borderWidth:1,borderColor:'black',borderRadius:10}}><Text style={styles.text}>{route.params.decription}</Text></View>
        <Touchable style={styles.btn}>
          <Text style={styles.txtbtn}>Back</Text>
        </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
container:{
    flex:1,
},
text:{
    fontSize:27,
    color:'#333', 
    fontWeight:400  
},
btn: {
    backgroundColor: 'blue',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    marginHorizontal:30,
  },
  txtbtn: {
    fontSize: 27,
    fontWeight: 600,
    color: 'white'
  },
});

export default Detail;
