import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image ,FlatList, Alert, TouchableHighlightBase, ToastAndroid} from 'react-native';
import { Input, CheckBox,Button ,Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';


import { logoutUser } from '../redux/ActionCreators';
import { loginUser } from '../redux/ActionCreators';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => ({
  logoutUser: (user) => dispatch(logoutUser(user)),
  loginUser: (user) => dispatch(loginUser(user)),
})

 
const mapStateToProps = state => {
    return {
     user:state.user
    }
  }

class Login extends Component{
   constructor(props){
    super();
     
    this.state={
      password: '',
      username:"",
      isValidPassword:true,
      isValidUser:true,
      cancel:false
   }
}



handlelogout()
{
  this.props.logoutUser()
    this.props.navigation.navigate('Login')
}

handleLogin() {

  if(this.state.username.trim().length <4)
  {
    this.setState({isValidUser:false})
  }
  else if(this.state.password.trim().length<4)
  {
    this.setState({isValidPassword:false})
  }


  else{
  this.props.loginUser({username:this.state.username,password:this.state.password})
  .then((data)=>{
   if(data.success=="true")
   {
   this.props.navigation.navigate('Home')
   }
  })
 
  }
}


     handlePasswordChange = (val) => {
      if( val.trim().length >= 4 ) {
            this.setState({
              password: val,
              isValidPassword: true
            })
      } else {
        this.setState({
          password: val,
          isValidPassword: false
        })
      }
  }


   handleValidUser = (val) => {
    if( val.trim().length >= 4 ) {
      this.setState({
        isValidUser: true,
        username:val
      })

    } else {
      this.setState({
        isValidUser:  false,
        username:val
      })
    }
}

  

render()
{
 if(this.props.user.user.username==null)
 {
  const {cancel} = this.state;
    return(
      <View style={styles.container}>
     
      <Input
          placeholder="Mobile Number/Username"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={val=>this.handleValidUser(val)}
          value={this.state.username}
          containerStyle={styles.formInput}
          />
           { this.state.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
      <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(val) => this.handlePasswordChange(val)}
          value={this.state.password}
          containerStyle={styles.formInput}
          />
           { this.state.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
            </Animatable.View>
            }
     
     <View style={{marginBottom:20}}>
           
             <Button title="Login"  icon={
          <Icon
              name='sign-in'
              type='font-awesome'            
              size={15}
              color= '#fff'
              style={{marginRight:5}}
        
              /> }  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'#08C3A0'}}  onPress={() => this.handleLogin()}/>
                   
       </View>

  </View>
  )
 }
 else
 {
   return(

      <View style={styles.container}>
          <Text style={{color:'black',alignSelf:'center',marginTop:30}}>Welcome: {this.props.user.user.username}</Text>
          <Text style={{color:'black',alignSelf:'center'}}>post: {this.props.user.user.post}</Text>
          <Text style={{color:'black',alignSelf:'center'}}>city: {this.props.user.user.city}</Text>

             <Button title="Logout"  icon={
          <Icon
              name='sign-out'
              type='font-awesome'            
              size={15}
              color= '#fff'
              style={{marginRight:5}}
        
              /> }  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'#08C3A0'}}  onPress={() => this.handlelogout()}/>
                   
       </View>
   )
 }
   

}
}
    

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      margin: 20,
  },
  imageContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  },
  formInput: {
      marginTop:20,
      marginBottom:0
  },
  formCheckbox: {
      margin: 20,
    
  },
  formButton: {
      margin: 60
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    margin:0
},
});


export default connect(mapStateToProps,mapDispatchToProps)(Login);