import * as ActionTypes from './ActionTypes';

export const refresh = (state  = { isLoading: true,
                                    errMess: null,
                                    refresh:{}}, action) => {
      switch (action.type) {
        case ActionTypes.REFRESH_DONE:
        return {...state, isLoading: false, errMess: null, refresh: action.payload};   

        default:
          return state;
    }
};