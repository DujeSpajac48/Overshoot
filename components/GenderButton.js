import { Text, Pressable, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GenderButton(){

   const buttonColors = ['grey','blue','pink'];
   const buttonGender = 
   ['Gender',
   <Icon name="mars" size={20} color="white" />,
   <Icon name="venus" size={20} color="white" />]
   const [pressCnt,setPressCnt] = useState(0);

   const handlePress = ()=>{
      setPressCnt((prev)=> (prev+1)%3);
   }
   return(
      // Dodat efekte botunima const tako da kad se kliknu nesto dogada
      //Svaki buton bi triba vodit negdi
      //Nadan se da necu morat radit 1000 custom butona za gluposti ;)
      < Pressable 
      onPress={handlePress}
      style={[styles.buttonContainer,{backgroundColor: buttonColors[pressCnt]}]}>
         <Text style={styles.buttonText}>{buttonGender[pressCnt]}</Text>
      </Pressable>
   );
}



const styles = StyleSheet.create({
   buttonContainer:{
      
      borderWidth:1,
      borderColor:'#darkgrey',
      justifyContent:'center',
      width: "30%",
      borderRadius: 14,
      height: '36%',
      marginBottom:30,
     
   },
   buttonText:{
      textAlign: 'center',
      color:'white',
      fontWeight: 'bold'
   }
})