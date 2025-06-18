// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Navigation from './NavBar/Navigation';
import store from './store/store';
import LoginNav from './NavBar/LoginNav';
import LoginScreen from './screens/LoginScreen'
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor='white' />
      {/* <LoginNav/> */}
      <Navigation />
      {/* <LoginScreen/> */}
      </Provider>
  );
}
