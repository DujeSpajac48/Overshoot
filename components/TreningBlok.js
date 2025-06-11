import Buttons from "./Buttons";
import Workout from "./Workout";
import Colors from "../constants/Colors";
import {  View,StyleSheet } from "react-native";

function TreningBlok({id,toDelete}){
   return(
      <>
      <Workout id={id} toDelete={toDelete}>Comp Deadlift</Workout> 
      <View style={styles.buttonContainer}>
        {/* <Buttons>Accessories</Buttons>
        <Buttons>Complete SBD</Buttons> */}
      </View>

      </>
   );
}

export default TreningBlok;

const styles = StyleSheet.create({
     buttonContainer:{
       flex:1,
       justifyContent:'space-evenly',
       flexDirection: 'row',
       marginTop: 10,
     },
     
 });
 