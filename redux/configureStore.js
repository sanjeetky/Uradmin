import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {user} from './user';
import {refresh} from './refresh';


import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
//import storage from 'redux-persist/lib/storage';

const config = {
    key: 'root',
    storage:AsyncStorage,
    debug: true
  }

export const ConfigureStore=()=>{
    const store = createStore(
        persistCombineReducers(config, {
            user,
            refresh
                }),
        applyMiddleware(thunk,logger)
    );

    const persistor = persistStore(store)
    return {store,persistor};
}