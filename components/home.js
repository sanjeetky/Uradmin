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

class Home extends Component{
 constructor(props)
  {
   super();
    this.state={
      food:[],    
    }
  }

componentDidMount()
{

  fetch(baseUrl+'/distributor')
  .then(response => response.json())
  .then(dishes => {
    this.setState({food:dishes})
  })
  .catch(err=>console.log(err))

};
  render(){

      const RenderItems = ({item,index})=>{
        
       
        return (
                   
                     
    <TouchableOpacity  onPress={() =>{clearInterval(this.intervalId), this.props.navigation.navigate('Menu',{cat:item.cat})}} >
                    
                        
          <View  style={{margin:2,borderWidth:2,borderRadius:15,borderColor:"#acb0ad",backgroundColor:'#fff'}} >
         
          <Image
            style={{justifyContent: 'center',
            alignItems: 'center',
        
            height: width/2,width:width*(46/100)}}
            source={{ uri: item.img }}
            resizeMode={'contain'}
           />
             <View style={{alignItems:"center",width:width*(46/100)}}>
                <Text style={{color:'black'}} >{item.name}</Text>
            </View>
        
         </View>
       </TouchableOpacity>
     )    
 };


  return (
   <View style={{position:'relative'}}>
      <ScrollView >
          <View style={styles.main}>
             <FlatList
                 data={this.state.food.filter(item=>item.city==this.props.user.user.city)}
                renderItem={RenderItems}
                keyExtractor={item => item.id}
                numColumns={2}
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

export default connect(mapStateToProps) (Home);