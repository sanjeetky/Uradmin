// In App.js in a new project



import React,{Component} from 'react';
import { Text,View,ScrollView,Dimensions,TouchableOpacity,FlatList,StyleSheet,Image,TextInput,Alert,SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
import { Formik } from 'formik';
import { baseUrl } from '../shared/baseUrl';
const {width}=Dimensions.get('window');




class Menu extends Component {
constructor(props){
    super()
    this.state={
        item:[],
        discription:"",
        cost:"",
        weight:"",
        img:"",
        status:"",
        state:""
    }
    
}
componentDidMount()
{
    fetch( baseUrl+'/items')
    .then(res=>res.json())
    .then(data=>{
        this.setState({item:data})
    })
    .catch(err=>console.log(err))
}

handleSubmit({values,item}) {
    
    var obj={
      description: values.description,
      img: values.img,
      cost:values.cost,
      weight:values.weight,
      status:values.status,
      state:values.state,
      brand:values.brand,
      itemid:item.itemid,
      cp:values.cp,
    }
    console.log(obj)

   fetch(  baseUrl+'/items',{
      method:"PUT",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify(obj)
    
  })
  .then(data=>data.json())
  .then(data=>Alert.alert("updated"))
  .catch(err=>console.log(err))
};

delete(data)
{
    fetch( baseUrl+'/items',{
        method:"DELETE",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({itemid:data})
    })
    .then(res=>res.json())
    .then(data=>Alert.alert(JSON.stringify(data)))
    .catch(err=>console.log(err))
   
}

  render() {


 const RenderItems = ({item,index})=>{
        return(
    
         
          <Formik
          initialValues={{cost:item.cost, description:item.description,cp:item.cp,brand:item.brand ,state:item.state,status:item.status,weight:item.weight,img:item.img}}
          onSubmit={values => this.handleSubmit({values,item})}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            
            <View style={{marginLeft:20,marginRight:20,marginBottom:20,borderWidth:1,borderColor:'grey'}}>

              <Image
            style={{justifyContent: 'center',
            alignItems: 'center',
        
            height: width/2,width:width*(46/100)}}
            source={{ uri: item.img }}
            resizeMode={'contain'}
           />

              <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Discription</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
             />

               <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Brand</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('brand')}
                onBlur={handleBlur('brand')}
                value={values.brand}
             />
             
            
             <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >Costing Price</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1 ,color:'black'}}
                onChangeText={handleChange('cp')}
                onBlur={handleBlur('cp')}
                value={values.cp}
             />
    
             
             <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >cost</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('cost')}
                onBlur={handleBlur('cost')}
                value={values.cost}
             />
            <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >weight</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1,color:'black' }}
                onChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                value={values.weight}
             />



      <Text style={{marginBottom:5,marginTop:5,fontSize:18,color:'black'}} >img</Text>
             <TextInput
                style={{ height: 40, borderColor:'#08C3A0', borderWidth: 1 ,color:'black'}}
                onChangeText={handleChange('img')}
                onBlur={handleBlur('img')}
                value={values.img}
             />

    
             <Text style={{marginTop:15,fontSize:18,color:'black'}}>State</Text>
              <Picker
                
                 style={{height: 50, width: width*(85/100),backgroundColor:'grey'}}
                 onValueChange={handleChange('state')}
                 value={values.state}
                 selectedValue={values.state}
                >
               <Picker.Item label="on" value="on" />
              <Picker.Item label="off" value="off" />

              </Picker>
    
            <Text style={{marginTop:15,fontSize:18,color:'black'}}>Status</Text>
              <Picker
                
                 style={{height: 50, width: width*(85/100),backgroundColor:'grey'}}
                 onValueChange={handleChange('status')}
                 value={values.status}
                 selectedValue={values.status}
               >
               <Picker.Item label="Trending" value="Trending" />
              <Picker.Item label="Offer" value="Offer" />
              <Picker.Item label="Normal" value="Normal" />
              </Picker>
              
              <View style={{margin:20}}>
           <Button title="Submit"  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'#08C3A0'}}  onPress={handleSubmit} title="Submit"/>
                 </View>
                 <View style={{margin:20}}>
           <Button title="Delete"  style={{alignSelf:'center'}} buttonStyle={{backgroundColor:'red'}}  onPress={()=>this.delete(item.itemid)} title="Delete"/>
                 </View>
            </View>
          )}
          </Formik>
        )
      }
      

if(this.state.item!=null)
{
    return (
         <SafeAreaView style={{position:'relative'}}> 
             <FlatList
                 data={this.state.item.filter((item)=>item.category==this.props.route.params.cat)}
                renderItem={RenderItems}
                keyExtractor={item => item.id}
                numColumns={1}
      />
      </SafeAreaView>
    );
}
else{
    return(
        <Text>Loading</Text>
    )
}
  }
}
export default Menu;





