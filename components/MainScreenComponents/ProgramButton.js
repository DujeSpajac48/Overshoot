import { Text, Pressable, View, StyleSheet } from "react-native";
import { Dimensions,Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function ProgramButton({children}){

   const navigation = useNavigation();

   return(
      // Dodat efekte botunima const tako da kad se kliknu nesto dogada
      //Svaki buton bi triba vodit negdi
      //Nadan se da necu morat radit 1000 custom butona za gluposti ;)
      < Pressable onPress={()=> navigation.navigate('Program')}>
      <View style={styles.programBox}>
         <View style={styles.programImage}>
         <Image
         source={require('./legs.png')}
         style={ {width: '100%',height: '100%',opacity: 0.75,borderTopLeftRadius: 17,
            borderTopRightRadius: 17}}
         />
         </View>
            <View style={styles.programDescription}>
               <Text style={styles.buttonText}>{children}</Text>
               <View>
                  <Text style={styles.buttonDescription}> </Text></View>

               <View style={styles.programLevel}><Text>Beginer</Text>
              <Text>3 weeks</Text></View>
            </View>
            
      </View>
      </Pressable>
   );
}


const styles = StyleSheet.create({
   programBox:{
      // borderColor: 'darkgreen',
      // borderWidth:1,
      width: Dimensions.get('window').width* 0.96,
      height: Dimensions.get('window').height* 0.28,
      margin:20,
      borderRadius: 16,
      
    },
    buttonText:{
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 10,
      paddingTop: 4,
    },
    buttonDescription:{
      paddingLeft: 10,
      paddingTop: 4,
    },
    programLevel:{
      borderColor: 'darkgreen',
      borderWidth:1,
      marginRight: 10,
      alignSelf: 'center',
      padding: 3,
      backgroundColor: 'lightgreen'
      // alignSelf: 'flex-end',
      // alignSelf:'center',
      // marginLeft: '65%',
      
    },
    programImage:{
      borderWidth:0.2,
      borderColor: '#444444',
      flex: 0.75,
      borderTopLeftRadius: 17,
      borderTopRightRadius: 17,
    },
    programDescription:{
      borderColor: '#333333',
      borderWidth:0.09,
      backgroundColor: '#E6E6E6',
      flex: 0.25,
      borderBottomLeftRadius: 17,
      borderBottomRightRadius: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
   
})