import { StyleSheet,View,Text,Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
function ExitButton({children}){

   const navigation = useNavigation();
   return(
   < Pressable  onPress={()=> navigation.navigate('MainScreen')}>
      <View style={styles.buttonContainer}>
         <Text style={styles.buttonText}>{children}</Text>
      </View>
      </Pressable>
   );
}

export default  ExitButton;

const styles = StyleSheet.create({
   buttonContainer:{
      flex:1,

      backgroundColor:"black",
      borderWidth:0.5,
      borderColor:'#B65E00',
      justifyContent:'center',
      marginLeft: -30,
      width: "100",
      marginBottom:20,
      opacity: 0.7,
      borderBottomEndRadius: 14,
   },
   buttonText:{
      textAlign: 'center',
      fontSize: 20,
      fontWeight:'bold',
      color: 'white',

   }
})