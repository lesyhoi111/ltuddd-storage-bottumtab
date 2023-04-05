
import React, { useState,useContext } from 'react';
import Item from './Item';
import { Text, StyleSheet, View, TouchableOpacity, Alert, ScrollView, SafeAreaView, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../config/themeContext'

function Setting (props) {
 const [ischecked,setIsChecked]=useState(true)
 const theme=useContext(themeContext);
  return (
    
    <SafeAreaView style={{flex:1,backgroundColor:theme.background}} >
      <View style={{alignSelf:'center',marginBottom:20,backgroundColor:theme.background}}>
        <Text style={[styles.txt,{fontWeight: 600,fontSize: 30,color:theme.color}]}>Setting</Text>
      </View>
      <View style={[styles.container,{backgroundColor:theme.background}]}>
      <Text style={[styles.txt,{color:theme.color}]}>Dark theme: </Text>
      <View style={{alignItems:'center'}}>
      <Switch style={{paddingTop:7}}
        value={ischecked}
        trackColor={{false: 'white', true: '#767577'}}
        thumbColor={ischecked ? 'blue' : 'green'}
        onValueChange={()=>{setIsChecked((value)=>!value)
        EventRegister.emit("changetheme",ischecked)}}
        />
        </View>
        
        </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  txt: {
    fontSize: 25,
    color: 'black'
  },
});

export default Setting;