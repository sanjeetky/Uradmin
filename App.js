// In App.js in a new project

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Main from './components/main.js';




import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';


const { persistor, store } = ConfigureStore();


class App extends Component{

  render(){
  return (
    <NavigationContainer>
    <Provider store={store}>
               <PersistGate 
                loading={null}
                persistor={persistor}>
                 <Main/>
               </PersistGate>
       </Provider>
    </NavigationContainer>
  );
  }
}

export default App;