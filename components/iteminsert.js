// In App.js in a new project



import React,{Component} from 'react';
import { Text,View,ScrollView,Dimensions,TouchableOpacity,FlatList,StyleSheet,Image,TextInput,Alert,SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
import { Formik } from 'formik';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import * as yup from 'yup'


const {width}=Dimensions.get('window');


const mapStateToProps = state => {
    return {
     user:state.user
    }
  }


class Iteminsert extends Component {
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
        food:[]
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
      name:values.name,
      description: values.description,
      itemid:this.props.user.user.city+values.cat+values.name,
      img: values.img,
      brand:values.brand,
      cost:values.cost,
      weight:values.weight,
      quantity:"1",
      category:values.cat,
      cp:values.cp,
      city:this.props.user.user.city
    
    }
    console.log(obj)

   fetch(  baseUrl+'/items',{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify(obj)
    
  })
  .then(data=>data.json())
  .then(data=>Alert.alert("Inserted"))
  .catch(err=>console.log(err))
};


  render() {


 
        return(
    <ScrollView>
         
          <Formik
          initialValues={{}}
          onSubmit={values => this.handleSubmit({values})}
          validationSchema={yup.object().shape({
            name: yup
            .string()
            .required('Please, provide its name!'),
            description: yup
            .string()
            .required('Please, provide its description!'),
              img: yup
              .string()
              .required('Please, provide its image address!'),
              brand: yup
              .string()
              .required('Please, provide its brand name!'),
              cost: yup
              .string()
              .required('Please, provide its cost like 20!'),
              weight: yup
            .string()
            .required('Please, provide its weight ex: 500g!'),
            cp: yup
            .string()
            .required('Please, provide its costing price!'),

          })}
        >
          {({ handleChange, handleBlur, handleSubmit, values ,touched,errors}) => (
            
            <View style={{marginLeft:20,marginRight:20,marginBottom:20}}>

            


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


              <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Discription</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
             />
                 {touched.description && errors.description &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.description}</Text>
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

               <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Brand</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('brand')}
                onBlur={handleBlur('brand')}
                value={values.brand}
             />
               {touched.brand && errors.brand &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.brand}</Text>
            }   
             
             <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Selling Price</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('cost')}
                onBlur={handleBlur('cost')}
                value={values.cost}
             />
               {touched.cost && errors.cost &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.cost}</Text>
            }   
               
            <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >weight</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                value={values.weight}
             />
               {touched.weight && errors.weight &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.weight}</Text>
            }   

            
             <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Costing Price</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1 ,color:'black'}}
                onChangeText={handleChange('cp')}
                onBlur={handleBlur('cp')}
                value={values.cp}
             />
          {touched.cp && errors.cp &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.cp}</Text>
            }   

    
       <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Category</Text>

          <Picker
                style={{height: 50, width: width*(85/100),backgroundColor:'grey'}}
                onValueChange={handleChange('cat')}
                value={values.cat}
                selectedValue={values.cat}
              >
              {this.state.food.filter(temp=>temp.city==this.props.user.user.city).map((item, index) => {
                   return (<Picker.Item label={item.cat} value={item.cat} key={index}/>) 
                   })}
             </Picker>


    
           
              <View style={{margin:20}}>
           <Button title="Insert"  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'#08C3A0'}}  onPress={handleSubmit} />
                 </View>
                
            </View>
          )}
          </Formik>
          </ScrollView>
        )
      
      


  }
}
export default connect(mapStateToProps) (Iteminsert);





