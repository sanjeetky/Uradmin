// In App.js in a new project

import React, { Component } from 'react';
import {Text,View,ScrollView,Dimensions,TouchableOpacity,FlatList,StyleSheet} from 'react-native';

const {width}=Dimensions.get('window');




class Report extends Component{
 


  render(){


  return (
   <View style={{position:'relative'}}>
      <Text style={{color:'black',alignSelf:'center',marginTop:30}}>We are working!!</Text>
      <Text style={{color:'black',alignSelf:'center',marginTop:10}}>It will be available soon!!</Text>
      <Text style={{color:'black',alignSelf:'center',marginTop:10}}>Thank you!!</Text>

      </View>
  
  )
  
}
  }


  
const styles = StyleSheet.create({
  main:{
   marginTop:10,
   flex: 1,
   justifyContent: "space-between",
   margin:4,
   backgroundColor:'#fff',
   borderRadius:10,
   paddingTop:10,
   paddingBottom:10
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#08C3A0",
    paddingTop: 10,
    padding:15,
    marginTop:10,
    margin:5,
    borderRadius:10
  },
  heading:{
    marginBottom:20,
    fontSize:20,
    fontWeight:'bold',
    color:'#fff'
  
  },
  notice:{
 alignItems:'center',
 borderWidth:3,
 borderColor:'red',
 borderRadius:10,
 margin:5,
 backgroundColor:'#fff',
  },
   video: {
    flex: 1,
    justifyContent: "space-between",
   
    borderRadius:10,
    height:200
  }
});

export default Report;