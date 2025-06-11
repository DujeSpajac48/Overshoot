import {View, Text, StyleSheet, TextInput, Platform, Pressable} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default function SelectionBar({setNum,onDelete,id}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.textDisplay}>{setNum}.</Text>
        <TextInput 
          placeholderTextColor={'#A0A0A0'}
          placeholder='8' 
          style={[styles.textDisplay,
            {backgroundColor:'#F5F5F5', 
              height: '110%',
              borderRadius: 6,
              paddingVertical: 4,
            }]}
          keyboardType='numeric'
          maxLength={2}
        />
        <TextInput 
          placeholderTextColor={'#A0A0A0'}
          placeholder='0kg' 
          style={[styles.textDisplay,
            {backgroundColor:'#F5F5F5', 
              height: '110%',
              borderRadius: 6,
              paddingVertical: 4,
            }]}
          keyboardType='numeric'
          maxLength={5}
        />
        <TextInput 
          placeholderTextColor={'#A0A0A0'}
          placeholder='@5' 
          style={[styles.textDisplay,
            {backgroundColor:'#F5F5F5', 
              height: '110%',
              borderRadius: 6,
              paddingVertical: 4,
            }]}
          keyboardType='numeric'
          maxLength={2}
        />
        
      </View>
      <View style={styles.trashContainer}>
      <Pressable 
      onPress={()=> onDelete(id)}
      style={styles.deleteSetStyle}>
        <Icon name='close-outline' size={32} color='#444444'/>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
   // borderWidth: 1,


    borderBottomWidth: Platform.OS === 'ios' ? 0.25 : 0.5,
    
    borderColor: '#C0C0C0',
   //  alignSelf: 'center',
    width: '95%',
    marginLeft:'7%',
   //  marginVertical: 4,
    borderRadius: 10,
    justifyContent: 'center',
   flexDirection: 'row',

  },
  rowContainer: {
   // borderWidth: 1,

   // paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
    justifyContent: 'space-around',
   //  marginRight: 8,
    width: '87%',

  },
  trashContainer:{
   width: '10%',
   alignSelf: 'center',
   marginRight: 24,
   // borderWidth: 1,
   position: 'relative'
  },
  textDisplay: {
    textAlign: 'center',
    padding: 0,
    width: 48,
    overflow: 'visible',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteSetStyle: {
   //  borderWidth: 1,
  },
});