import {Text,View,StyleSheet,Pressable,TextInput} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

import * as SQLite from 'expo-sqlite';
import initDB from '../SQLite/database';
import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function DaysPreset({dayNum}){


   const navigation = useNavigation();
   const route = useRoute();



   return(

      <View style={styles.dayButton}>
                     <Text>Day {dayNum}</Text>
                     <TextInput
                     placeholder='Muscle Group'
                     placeholderTextColor={'#888888'}

                     /> 
                     <Pressable 
                     onPress={()=> navigation.navigate('Program')}
                     
                     style={{paddingLeft: 12,paddingVertical: 12,}}>
                        <Icon name='enter-outline' size={24}/>
                     </Pressable>
      </View>       
   );
}


const styles = StyleSheet.create({
   
   dayButton:{
      borderColor: '#555555',
      borderWidth: 0.32,
      width: '92%',
      height: 62,
      justifyContent: 'center',
      marginVertical: 6,
      paddingHorizontal: 20,
      borderRadius: 6,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems:  'center'
      
   },
});