import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import reducer from './app/redux/reducers';
import { createStore } from 'redux';

const store = createStore(reducer);


const AppContainer = () => 
    <Provider store={store}>
        <App/>
    </Provider>
AppRegistry.registerComponent('FirstApp', () => AppContainer);
