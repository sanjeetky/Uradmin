// In App.js in a new project



import React,{Component} from 'react';
import { Text,View,ScrollView,Dimensions,TouchableOpacity,FlatList,StyleSheet,Image,TextInput,Alert,SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
import { Formik } from 'formik';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import * as yup from 'yup'
import { refreshscreen } from '../redux/ActionCreators';

const {width}=Dimensions.get('window');


const mapStateToProps = state => {
    return {
     user:state.user,
     refresh:state.refresh
    }
  }

  const mapDispatchToProps = dispatch => ({
    refreshscreen: () => dispatch(refreshscreen()),
  })

class Sectioninsert extends Component {
constructor(props){
    super()
    this.state={
        item:[],
        discription:"",
        cost:"",
        weight:"",
        img:"",
        status:"",
        state:"",
        food:[],
        mount:1
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
}

handleSubmit({values}) {
    
    var obj={
      id:this.props.user.user.city+values.name,
      name:values.name,
      img: values.img,
      cat:values.cat,
      city:this.props.user.user.city
    
    }
    console.log(obj)

   fetch(  baseUrl+'/distributor',{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify(obj)
    
  })
  .then(data=>data.json())
  .then(data=>Alert.alert("Inserted"))
  .catch(err=>console.log(err))
};




delete(data){
  return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this section?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            fetch( baseUrl+'/distributor',{
              method:"DELETE",
              headers:{ "Content-Type":"application/json"},
              body:JSON.stringify({id:data})
          })
          .then(res=>res.json())
          .then(data=>Alert.alert("deleted"))
          .catch(err=>console.log(err))
           //this.setState({mount:this.state.mount+1})
           this.props.refreshscreen();
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




  render() {


    const RenderItems = ({item,index})=>{
        
       
      return (
                 
                   
                  
                      
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
          <View style={{margin:20}}>
           <Button title="Remove"  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'red'}} onPress={()=>this.delete(item._id)}  />
                 </View>

       </View>
   )    
};


 
        return(
    <ScrollView>
         
          <Formik
          initialValues={{}}
          onSubmit={values => this.handleSubmit({values})}
          validationSchema={yup.object().shape({
            name: yup
              .string()
              .min(4,"minimum length is 4")
              .max(10, 'name should not excced 10 chars.')
              .required(),
              img: yup
            .string()
            .required('Please, provide your name!'),

            cat: yup
              .string()
              .min(4,"minimum length is 4")
              .max(10, 'category name should not excced 10 chars.')
              .required(),

          })}
        >
          {({ handleChange, handleBlur, handleSubmit, values,touched,errors }) => (
            
            <View style={{marginLeft:20,marginRight:20,marginBottom:20}}
            
            >

            


            <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Name</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
             />
             {touched.name && errors.name &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
            }   

             

             
           <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >img</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1 ,color:'black'}}
                onChangeText={handleChange('img')}
                onBlur={handleBlur('img')}
                value={values.img}
             />
          {touched.img && errors.img &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.img}</Text>
            }   

       <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Category</Text>

       <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1 ,color:'black'}}
                onChangeText={handleChange('cat')}
                onBlur={handleBlur('cat')}
                value={values.cat}
             />
            {touched.cat && errors.cat &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.cat}</Text>
            }   
    
           
              <View style={{margin:20}}>
           <Button title="Insert"  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'#08C3A0'}}  onPress={handleSubmit} />
                 </View>
                
            </View>
          )}
          </Formik>

           <Text style={{color:'black',alignSelf:'center'}}>Present Sections</Text>

           <View style={styles.main}>
             <FlatList
                 data={this.state.food.filter(item=>item.city==this.props.user.user.city)}
                renderItem={RenderItems}
                keyExtractor={item => item.id}
                numColumns={2}
          />
         </View>

          </ScrollView>
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

export default connect(mapStateToProps,mapDispatchToProps) (Sectioninsert);





