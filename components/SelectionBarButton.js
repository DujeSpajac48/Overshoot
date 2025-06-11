import { StyleSheet,View,Text,Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

function SelectionBarButton({children}){

   const navigation = useNavigation();
   return(
   < Pressable  onPress={()=> navigation.navigate('MainScreen')}
   >
      {/* //kad se klikne botun promini se boja */}
      {({pressed})=>(
      <View style={styles.buttonContainer}>
         <Text style={[styles.buttonText, {color: pressed ? 'black' : '#333333'}]}>
            {children}</Text>
      </View>
      )}
      </Pressable>
   );
}

export default  SelectionBarButton;

const styles = StyleSheet.create({
   buttonContainer:{
      // backgroundColor:"black",
      // borderWidth:0.5,
      // borderColor:'#B65E00',
      justifyContent:'center',
      marginHorizontal: 5,
      width: 120,
      height: '100%',
      marginBottom:20,
      paddingBottom: 2,
      opacity: 0.7,
   },
   buttonText:{
      textAlign: 'center',
      fontSize: 20,
      fontWeight:'bold',
      color: '#333333',

   }
})