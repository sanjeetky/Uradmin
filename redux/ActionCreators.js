import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { ToastAndroid } from 'react-native';




export const loginUser = (user) => (dispatch) => {
    
    return fetch( baseUrl+'/adminusers/login',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
      
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data =>{
        if(data.success==true)
        {
           
            ToastAndroid.show("Welcome "+ data.username,ToastAndroid.SHORT)
           dispatch(loginuser({username:data.username,password:data.password,mobilenum:data.mobilenum,post:data.post,city:data.city}))
           return({success:"true"})

        }
        else
        {
        ToastAndroid.show("Invalid Credentials!!",ToastAndroid.SHORT)
         return({success:"false"})
        }
    })
    .catch(error => dispatch(loginFailed(error.message)));
};

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

export const loginuser = (data) => ({
    type: ActionTypes.LOGIN_DONE,
    payload: data
});

export const loginLoading = () => ({
    type: ActionTypes.LOGIN_LOADING
});

export const logoutUser=()=>({
    type: ActionTypes.LOGOUT_DONE,
    payload: {username:null,password:null}
})

//REFRESHING THE STRING 
export const refreshscreen=()=>({
    type: ActionTypes.REFRESH_DONE,
    payload: {refresh:null}
})