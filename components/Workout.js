   import { View , Text,StyleSheet,TextInput,Pressable } from "react-native";
   import { useState } from "react";
   import Selector from "./Selector";
   import { Button } from "@react-navigation/elements";
   import Ionicons from 'react-native-vector-icons/Ionicons';
   import Icon from "react-native-vector-icons/Ionicons";


   //ovo je budling block za dodavanje
   function Workout({ children,id,toDelete }) {
   const [addSelector,setAddSelector] = useState([{id: Date.now()}]);

   const [exerciseName, setExerciseName] = useState(children || "");


      function pressHanlder(){
         setAddSelector(prev => [...prev, {id: Date.now()}]);
      }
      function pressHandleDelete(idToRemove){
      if(addSelector.length >1){
         setAddSelector(prev=>prev.filter(selector=>selector.id !== idToRemove));
      }
      
      }
      return (
      <>
      <View style={styles.workoutContainer}>
         <View style={styles.headerRowContainer}>
         <TextInput style={styles.headerText}
         >{children}</TextInput>
         
         <Pressable 
         onPress={()=>toDelete(id)}
         
         style={styles.headerButtonStyle}>
            <Ionicons name="trash-outline" size={26} color="#444444"  />
         </Pressable>
         </View>

         <View style={styles.rowContainer}>
         <Text style={styles.rowHeader}>Set</Text>
         <Text style={styles.rowHeader}>Reps</Text>
         <View style={styles.inputHeader}>
         <Text style={styles.rowHeader}>Load</Text>
         <Text style={styles.rowHeader}>RPE</Text>
         </View>
         </View>
         
         
         {addSelector.map((selector,index)=>(
               <Selector 
               key={selector.id}
               setNum={index+1}
               onDelete={pressHandleDelete}
               id={selector.id}
               />
         ))}
         <View style={styles.buttonContainer}>
         <Pressable 
            onPress={pressHanlder}
            style={styles.iconButton}
            android_ripple={{ color: '#ccc', borderless: true }}
            >
            <Icon name='add-circle' size={36} color="lightblue" />
         </Pressable>
         </View>
      </View>

      <View style={styles.lineContainer}>
            <View style={styles.line}/>
         </View>
      </>
      );
   }

   export default Workout;
   //"#A8A8A8"
   const styles = StyleSheet.create({
      workoutContainer: {
   // backgroundColor: "#e0e2eb",   
         // borderWidth: 1,
      alignItems: 'flex-start',  
      borderBlockColor:'white',
      paddingRight: 16
      
      },
      rowContainer:{
      // borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      // paddingRight: 45,
      width: '86%',
      alignSelf: 'center',
      marginBottom: 8, 
      marginRight: 20,
   },
      headerText: {
         marginLeft: 32,
      marginVertical: 4,
      color: 'lightblue',          
      fontSize: 32,           
      fontWeight: 'bold',   
         
      },
      headerRowContainer:{
         // borderWidth: 1,

         flexDirection: 'row',
         width: '100%',
      
         alignSelf: 'center',
         justifyContent: 'space-between'

      },
      headerButtonStyle:{
         // borderWidth: 1,
         // padding: 12,
         paddingVertical: 12,
         paddingLeft: 12,
         // width: '12%'   ,
         // height: '12%',
         alignSelf: 'center',
         backgroundColor: 'transparent',
         // borderRadius: 30,
         // width: 30,
         marginRight: 16,
      
         
      },

      buttonContainer:{
         // borderWidth: 1,
         // height: '40%',
         alignSelf: 'center',
         width: '86%',
         flexDirection: 'row',
         justifyContent: 'center',
         justifyContent: 'space-evenly'


         
      },
      iconButton: {
         paddingTop: 8,
         borderRadius: 24,
         justifyContent: 'center',
         alignItems: 'center',
      },

      inputHeader:{
         // borderWidth: 1,

         width: '39%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingRight: 10,
         
      },
      rowHeader:{
      width: 38,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#444444',
      },
      lineContainer:{
      flexDirection: 'row',
      alignContent: 'center',
      marginHorizontal: '7%',
      marginVertical: 4,
   },


   line:{
      flex: 1,
      height:1,
      backgroundColor: '#A0A0A0',
      marginTop:4,
   },
   text:{
      color: '#444444',
      fontWeight: 'semibold'
   }
   });
   

