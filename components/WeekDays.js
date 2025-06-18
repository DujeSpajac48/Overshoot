
import {Text,View,StyleSheet,Pressable,TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


import DaysPreset from './DayPreset';
export default  function WeekDays(){
   return(
      <>      
      <View style={styles.headerTextContainer}>
            <Text style={{fontSize: 40}}>Week 1</Text>
            </View>
      <View style={styles.mainContainer}>
            
            
            
            <View style={styles.daysContainer}>
               
                  <DaysPreset/>
                  <DaysPreset/>
                  <DaysPreset/>
            
               <View style={styles.butttonContainer}>
                  <Pressable style={styles.addDay}>
                     <View>
                     <Icon name="close-circle-outline" size={36} color={'red'} />
                     
                     </View>
                  </Pressable>
                  <Pressable style={styles.addDay}>
                     <View>
                        <Icon name='add-circle-outline' size={36} color={'green'}/>
                     </View>
                  </Pressable>   

               </View>

            </View>
      </View>
   </>
   );
}


const styles = StyleSheet.create({
   mainContainer:{
      // borderWidth: 4,
      flex:1,
      // borderColor: 'pink',
   },
   headerTextContainer:{
      marginTop: 12,
      paddingLeft: 20,
   },
   daysContainer:{
      height: '100%',
      borderWidth:1,
      borderColor: 'lightgrey',
      alignItems: 'center',

   },
   dayButton:{
      borderColor: 'blue',
      borderWidth: 1,
      width: '92%',
      height: 72,
      justifyContent: 'center',
      marginVertical: 6,
      paddingHorizontal: 20,
      borderRadius: 6,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems:  'center'
      
   },
   addDay:{

   },
   butttonContainer:{
      flexDirection: 'row',
      width: '48%',
      justifyContent: 'space-between',
      // paddingHorizontal: ,
      marginBottom: 6,
   }
});