
import { use, useState } from "react";
import { Text,TextInput,View ,StyleSheet} from "react-native";

 




export default function WorkoutInfoInput(
   {inputGuide='Sta je ode',
   inputGuideSugestion= 'Sta bi se tribalo unit',
   placeHolderText='Ode se to unosi',
   value,onChangeText
}){



     
   


   return(
      

      <View style={styles.inputContainer}>
         
         <View style={styles.inputNesto}>
         <Text style={styles.textDescription}>{inputGuide}</Text>
         <Text style={{color: '#A0A0A0',fontSize:12 , marginLeft: 4,}}>{inputGuideSugestion}</Text>
         </View>
         <TextInput
         
         value={value}
         onChangeText={onChangeText}
         style={styles.workoutInfo}
         placeholder={placeHolderText}
         placeholderTextColor={'#A0A0A0'}
         />


      </View>

   )
}


const styles = StyleSheet.create({
  
  
   inputContainer:{
      // borderWidth: 1,
      borderColor: 'red'
   },
   inputNesto:{
      flexDirection: 'row',
      // borderWidth: 1,
      height: '24',
      alignItems: 'flex-end'
      
   },
   workoutInfo:{
      borderWidth: 1,
      borderRadius: 4,
      borderColor:  '#D0D0D0' ,
      marginHorizontal: 12,
      paddingLeft: 6,
      padding: 12
   },
   textDescription:{
      marginLeft:16,
      fontSize: 14,
     
   },


})
