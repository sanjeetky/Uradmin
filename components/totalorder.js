// In App.js in a new project

import React, { Component } from 'react';
import {Text,View,ScrollView,Dimensions,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import { Image} from 'react-native-elements';
const {width}=Dimensions.get('window');
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
   user:state.user
  }
}

class Totalorder extends Component{
 constructor(props)
  {
   super();
    this.state={
      item:[],    
    }
  }

componentDidMount()
{

    fetch( baseUrl+'/delivery/display')
    .then(res=>res.json())
    .then(data=>{
        this.setState({item:data})
    })
    .catch(err=>console.log(err))

};
  render(){

      const RenderItems = ({item,index})=>{
        
       
        return (
                   
                     
                    
                        
          <View  style={{margin:2,borderWidth:2,borderRadius:15,borderColor:"#acb0ad",backgroundColor:'#fff'}} >
         
          
                <Text style={{color:'black'}} >Username: {item.username}</Text>
                <Text style={{color:'red'}} >{item.fullname} {item.telnum}</Text>
                <Text style={{color:'black'}} >{item.date}</Text>
                <Text style={{color:'black'}} >{item.houseno}  {item.area}  {item.city}</Text>
                <Text style={{color:'black'}} >Delivery time:{item.time}</Text>
                <Text style={{color:'black'}} >Payment mode: {item.payment}</Text>
                <Text style={{color:'green'}} >Status: {item.status}</Text>

             {item.item.map((hello)=>{
                 return (
                     <View style={{marginTop:3}}>
                 <Text style={{color:'blue'}} >{hello.name}  {hello.brand}  {hello.cost}</Text>
                 <Text style={{color:'red'}} >{hello.weight} X {hello.quantity}</Text>
                    </View>
                 )
             })}
            <Text style={{color:'red',marginTop:10,marginBottom:5}} >Total Price: {item.price}</Text>
         </View>
     )    
 };


  return (
   <View style={{position:'relative'}}>
      <ScrollView >
          <View style={styles.main}>
             <FlatList
                 data={this.state.item.filter(item=>item.city==this.props.user.user.city)}
                renderItem={RenderItems}
                keyExtractor={item => item.id}
                numColumns={1}
      />
      </View>
   <Text style={{alignSelf:'center',margin:10,color:'black'}}>That's all folks!!</Text>
   
      </ScrollView>

     
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

export default connect(mapStateToProps) (Totalorder);