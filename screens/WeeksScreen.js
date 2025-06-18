
import {Text,View,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';

import WeekDays from '../components/WeekDays';

export default function WeekScreen(){
   return(
      <>
      <SafeAreaView style={styles.safeAreaContainer}>
         <ScrollView style={{flex:1,borderWidth: 1,}}>
            <WeekDays/>
            <WeekDays/>
            <WeekDays/>

         
         </ScrollView>
      </SafeAreaView>
      </>
   );
}


const styles = StyleSheet.create({
   safeAreaContainer:{
      flex: 1,
      // borderWidth: 2,
      // backgroundColor: '#f6f6f9',
   },     

});