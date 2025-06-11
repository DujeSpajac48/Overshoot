import { Text, Pressable, View, StyleSheet } from "react-native";

function Buttons({children}){
   return(
      // Dodat efekte botunima const tako da kad se kliknu nesto dogada
      //Svaki buton bi triba vodit negdi
      //Nadan se da necu morat radit 1000 custom butona za gluposti ;)
      < Pressable >
      <View style={styles.buttonContainer}>
         <Text style={styles.buttonText}>{children}</Text>
      </View>
      </Pressable>
   );
}

export default  Buttons;

const styles = StyleSheet.create({
   buttonContainer:{
      backgroundColor:"#ff9866",
      borderWidth:1,
      borderColor:'#f76923',
      justifyContent:'center',
      width: "130",
      borderRadius: 14,
      height: 50,
      marginBottom:30,
     
   },
   buttonText:{
      textAlign: 'center',
      color:'white',
      fontWeight: 'bold'
   }
})