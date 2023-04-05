import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListItem from './ListItem'
import Favourite from './Favourite'
import Setting from './Setting'
import { EventRegister } from 'react-native-event-listeners'
import theme from '../config/theme'
import themeContext from '../config/themeContext'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function StackMain(props) {
  const [ischecked,setIsChecked]=useState(false)
  useEffect(()=>{
    let eventlistener=EventRegister.addEventListener("changetheme",(data)=>{setIsChecked(data)})
    return ()=>{EventRegister.removeEventListener(eventlistener)}
  })
    return (
      <themeContext.Provider value={ischecked===true ? theme.dark:theme.light}>
        <NavigationContainer>
            <Tab.Navigator initialRouteName="ListItem" screenOptions={{headerShown:false, tabBarActiveTintColor: 'green',tabBarStyle:{backgroundColor:ischecked===true ? theme.dark.background:theme.light.background}}}>
                <Tab.Screen name="ListItem" component={ListItem} options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle:{fontSize:15},
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}/>
                <Tab.Screen name="Favourite" component={Favourite} options={{
          tabBarLabel: 'Favourite',
          tabBarLabelStyle:{fontSize:15},
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards-heart" color={color} size={30} />
          ),
        }}/>
                <Tab.Screen name='Setting' component={Setting} options={{
          tabBarLabel: 'Setting',
          tabBarLabelStyle:{fontSize:15},
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={30} />
          ),
        }}/>
            </Tab.Navigator>
        </NavigationContainer>
        </themeContext.Provider>
    )
};
export default StackMain;