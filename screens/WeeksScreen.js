import { Text, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

import WeekDays from '../components/WeekDays';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import initDB from '../SQLite/database';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
export default function WeekScreen({Id}) {

   const route = useRoute();
   const userId = route.params?.userId;
  const [weeks, setWeeks] = useState([]);
  console.log('UserId',userId);

  const fetchData = async (userId) => {
    try {
      const dbConn = await initDB(); 

      const data = await dbConn.getAllAsync(
         `SELECT duration FROM users WHERE id = ?`,  //uvati ga
         [userId]
       );
       console.log("data",data);
       const brojTjedana = data[0]?.duration || 1;
       console.log('Broj tjedana:', brojTjedana);
   
       // pritvara broj u niz
       const weeksArray = Array.from({ length: brojTjedana }, (_, i) => ({ id: i + 1 }));
   

       setWeeks(weeksArray);
       console.log('Rezultat:', weeksArray);
     } catch (e) {
       console.error('Nije dovatilo iz baze:', e);
     }
   };


  useFocusEffect(
   useCallback(() => {
     const refreshWeeks = async () => {
       if (userId) {
         await fetchData(userId); //ovaj tu id je iz parametara 
       } else {
         Alert.alert('Neradi', 'Id nije uvatilo');
       }
     };
 
     refreshWeeks();
 
     return () => {
       setWeeks([]);
     };
   }, [userId]) 
 );
 
 
  
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {weeks.map((w) => (
          <WeekDays 
          key={w.id} id={w.id} userId={userId} 
          
          z/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
