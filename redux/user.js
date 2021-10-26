import * as ActionTypes from './ActionTypes';

export const user = (state  = { isLoading: true,
                                    errMess: null,
                                    user:{}}, action) => {
      switch (action.type) {
        case ActionTypes.LOGIN_DONE:
        return {...state, isLoading: false, errMess: null, user: action.payload};

        case ActionTypes.LOGIN_LOADING:
            return {...state, isLoading: true, errMess: null, user:{}}

        case ActionTypes.LOGIN_FAILED:
            return {...state, isLoading: false, errMess: action.payload};


        case ActionTypes.LOGOUT_DONE:
            return {...state,isLoading:false,errMess:null,user:action.payload}            

        default:
          return state;
    }
};