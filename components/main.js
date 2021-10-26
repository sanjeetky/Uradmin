// In App.js in a new project

import * as React from 'react';
import { View, Text, SectionList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from './home.js';
import LoginComponent from './LoginComponent';
import Menu from './menu.js';
import Iteminsert  from './iteminsert.js';
import sectioninsert from './sectioninsert.js';
import Delivery from './delivery.js';
import totalorder  from './totalorder.js';
import Report from './report.js';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();
const Tap = createMaterialTopTabNavigator();




const Stack = createNativeStackNavigator();

function Main() {
 
const Tabnavigator=({Navigator,props})=>{
    return(
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Homenavigator} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}/>
         <Tab.Screen name="Orders" component={Ordernavigator}
          options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
          />
          <Tab.Screen name="Insert" component={Insertnavigator}
           options={{
          tabBarLabel: 'Insert',
          tabBarIcon: ({ color, size }) => (
            <Icon name="pen" color={color} size={size} />
          ),
        }} />
           <Tab.Screen name="Report" component={Report} 
            options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
        />
         <Tab.Screen name="Profile" component={LoginComponent} 
            options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
        }}
        />
      </Tab.Navigator>
    )
}

const Insertnavigator=()=>

  (
    <Tap.Navigator initialRouteName='Section'>
    <Tap.Screen name="Section" component={sectioninsert} />
    <Tap.Screen name="Item" component={Iteminsert} />
   
  </Tap.Navigator>
  )

  const Ordernavigator=()=>

  (
    <Tap.Navigator initialRouteName='delivery'>
    <Tap.Screen name="delivery" component={Delivery} />
    <Tap.Screen name="totalorder" component={totalorder} />
   
  </Tap.Navigator>
  )


      const Homenavigator=({navigation,props})=>
  {
    return(
      <Stack.Navigator
      initialRouteName='Home'
      >
        <Stack.Screen name="Home" component={Home}
         options={{
          title:"Home",
          headerStyle:{backgroundColor:"#26977D"},
          headerTintColor:"#ffffff",
          headerLeft:(color)=>(
            <Icon
            name='home' color={'#ffffff'} size={24}  style={{paddingLeft:0,paddingRight:5}}
            
          />
           )
        }}
        />
        <Stack.Screen name="Menu" component={Menu}
        
         options={{
          headerStyle:{backgroundColor:"#26977D"},
          headerTintColor:"#ffffff"
          }}
        />
      </Stack.Navigator>
  )
  }


  

       return (
    
     
<Tabnavigator/>
  
    
  );
}

export default Main;