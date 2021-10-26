// In App.js in a new project

import React, { Component } from 'react';
import {Text,View,ScrollView,Dimensions,TouchableOpacity,FlatList,StyleSheet,Alert} from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import { Image} from 'react-native-elements';
const {width}=Dimensions.get('window');
import { connect } from 'react-redux';
import {Button} from 'react-native-elements';


const mapStateToProps = state => {
  return {
   user:state.user
  }
}

class Delivery extends Component{
 constructor(props)
  {
   super();
    this.state={
      item:[],  
      showBox:true,
      setShowBox:true  
    }
  }

componentDidMount()
{

    fetch( baseUrl+'/delivery')
    .then(res=>res.json())
    .then(data=>{
        this.setState({item:data})
    })
    .catch(err=>console.log(err))

};



delivered(data){
    return Alert.alert(
        "Are your sure?",
        "Are you sure you want to deliver this order?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              this.setState({showBox:false})
              const obj={
                id:data,
                status:"Delivered"
            }
           fetch( baseUrl+'/delivery',{
            method:"PUT",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify(obj)
          
        })
        .then(data=>data.json())
        .then(data=>Alert.alert("updated"))
        .catch(err=>console.log(err))
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
          
            text: 'No',
            onPress: () => Alert.alert("cancelled")
          },
        ]
      );
}



cancel(data){
    return Alert.alert(
        "Are your sure?",
        "Are you sure you want to cancel this order?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              this.setState({showBox:false})
              const obj={
                id:data,
                status:"Cancelled"
            }
           fetch( baseUrl+'/delivery',{
            method:"PUT",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify(obj)
          
        })
        .then(data=>data.json())
        .then(data=>Alert.alert("updated"))
        .catch(err=>console.log(err))
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
          
            text: 'No',
            onPress: () => Alert.alert("cancelled")
          },
        ]
      );
}


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
 
             {item.item.map((hello)=>{
                 return (
                     <View style={{marginTop:3}}>
                 <Text style={{color:'blue'}} >{hello.name}  {hello.brand}  {hello.cost}</Text>
                 <Text style={{color:'red'}} >{hello.weight} X {hello.quantity}</Text>
                    </View>
                 )
             })}
            <Text style={{color:'red',marginTop:10,marginBottom:5}} >Total Price: {item.price}</Text>
           
           
            <View style={{margin:10}}>
            {this.state.showBox}
            <Button title="Deliver"  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'#08C3A0'}}  onPress={()=>this.delivered(item._id)}  />
            </View>
           
            <View style={{margin:20}}>
            {this.state.showBox}
            <Button title="Cancel"  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'red'}}onPress={()=>this.cancel(item._id)}   />
            </View>
         </View>
     )    
 };


  return (
   <View style={{position:'relative'}}>
      <ScrollView >
          <View style={styles.main}>
             <FlatList
                 data={this.state.item.filter(item=>item.status=="Inprogress"&&item.city==this.props.user.user.city)}
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
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
});

export default connect(mapStateToProps) (Delivery);