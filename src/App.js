import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text}  from 'react-native';
import ReduxTunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './components/LoginForm'
import Router from './Router';



class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCS6NOIq2z1LV20fVBFUx-gAktkFUVJY-A',
            authDomain: 'manager-cf60b.firebaseapp.com',
            databaseURL: 'https://manager-cf60b.firebaseio.com',
            projectId: 'manager-cf60b',
            storageBucket: 'manager-cf60b.appspot.com',
            messagingSenderId: '356115814377'
          };

          firebase.initializeApp(config);
    };


    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxTunk));
        return (
            <Provider store={store}> 
                <Router />
            </Provider>
        )
    } 
}
export default App;