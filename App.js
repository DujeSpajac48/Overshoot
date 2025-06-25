// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Navigation from './NavBar/Navigation';
import store from './store/store';

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import SQLite from 'react-native-sqlite-storage';


// // Omogući Promise API
// SQLite.enablePromise(true);

// const openDatabase = async () => {
//   try {
//     const db = await SQLite.openDatabase({
//       name: 'RegisterSQL',
//       location: 'default',
//       createFromLocation: 1
//     });

//     // Testiraj konekciju
//     await db.executeSql('SELECT 1', []);
//     return db;
//   } catch (error) {
//     console.error('Greška pri otvaranju baze:', error);
//     throw error;
//   }
// };
export default function App() {
  return (
    <Provider store={store}>  
      <StatusBar barStyle="dark-content" backgroundColor='white' />

      <Navigation />
      {/* <LoginScreen/> */}
      
      </Provider>
  );
}
