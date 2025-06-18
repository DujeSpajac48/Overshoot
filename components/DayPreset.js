import {Text,View,StyleSheet,Pressable,TextInput} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

export default function DaysPreset({index}){
   return(

      <View style={styles.dayButton}>
                     <Text>Day {index}</Text>
                     <TextInput> Chest</TextInput>
                     <Pressable  style={{paddingLeft: 12,paddingVertical: 12,}}>
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