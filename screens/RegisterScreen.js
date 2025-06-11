import React from 'react';
import {Text,View,StatusBar,StyleSheet,TextInput,Pressable,Keyboard,ScrollView} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import GenderButton from './components/GenderButton';

export default function RegisterScreen() {
  return (
    <>
    

      <SafeAreaView style={styles.safeArea} edges={['top']}>
      
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1, }}>
          <View style={styles.textConatiner}>
            <Text style={styles.headerText}>Slika</Text>
          </View>
          <View style={styles.loginContainer}>

            <View style={styles.doubleInputContainer}>
              <View style={styles.doubleInput}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#A0A0A0"
                  style={{ color: '#333333' }}
                />
              </View>
              <View style={styles.doubleInput}>
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="#A0A0A0"
                  style={{ color: '#333333' }}
                />
              </View>
            </View>
            <View style={styles.doubleInputContainer}>
              <View style={styles.doubleInput}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#A0A0A0"
                  style={{ color: '#333333' }}
                />
              </View>
              <GenderButton />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.singleInput}>
                <TextInput
                  placeholder="Email adress"
                  placeholderTextColor="#A0A0A0"
                  style={{ color: '#333333' }}
                  keyboardType='email-address'
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.singleInput}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#A0A0A0"
                  style={{ color: '#333333' }}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.singleInput}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#A0A0A0"
                  style={{ color: '#333333' }}
                />
              </View>
              
            </View>
            <Text>Terms of service</Text>
            <Text>Subscribe to info </Text>
            
          </View>
        </Pressable>

      </SafeAreaView>

    </>
  );
}

// crnija 384142 gadna
// boje 4c5b5c siva ajme 
// ff715b naranca okej 
// f9cb40 zuta  meh mozda
const styles = StyleSheet.create({
  safeArea:{
    flex:1,
    backgroundColor:'#FAFAFA',
   
   
  },
  textConatiner:{
    borderColor: '#E0E0E0',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    marginTop: '24%',
    marginLeft: '7%',
    paddingLeft: '5%'
    
  },
  headerText:{
    textAlign: 'justify',
    fontSize: 52,
    color: 'grey',
  },
  loginContainer:{
    flexGrow: 1,
    backgroundColor: '#F0F0F0',
    borderTopWidth: 1.2,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: '20%',
    paddingVertical: 24,
  },

  

  inputContainer: {
    width: '86%', 
    marginTop: 12,
  },
  singleInput: {
    borderColor: '#D0D0D0',
    borderWidth: 1.2,
    backgroundColor: '#E8E8E8',
    height: 48,  
    justifyContent: 'center',
    paddingLeft: 12,
  },
  doubleInputContainer: {
    flexDirection: 'row',
    marginTop:12,
    gap: 12,
    width: '86%',
  },
  doubleInput: {
    flex: 1,  
    borderColor: '#D0D0D0',
    borderWidth: 1.2,
    backgroundColor: '#E8E8E8',
    height: 48,
    justifyContent: 'center',
    paddingLeft: 12,
  }

});
