
import React from 'react';
import {Text,View,StatusBar,StyleSheet,TextInput,Pressable,Keyboard} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';
import SpacerLine from '../components/SpacerLine';


export default function LoginScreen() {
  return (
    <>
    
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1, }}>
          <View style={styles.textConatiner}>
            <Text style={styles.headerText}>OverShoot</Text>
          </View>

          <View style={styles.loginContainer}>

            <View style={styles.loginInput}>
              <TextInput
                placeholder="Email adress"
                placeholderTextColor="#A0A0A0"
                style={{ color: '#333333' }}
                inputMode="email"
              />
            </View>

            <View style={styles.loginInput}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                style={{ color: '#333333' }}
                textContentType="password"
              />
            </View>

            <View style={styles.forgotPass}>
              <Text style={{ color: 'blue' }}>Forgot password?</Text>
            </View>

            <LoginButton />
            <RegisterButton/>

            <SpacerLine/>

            <Text style={{color: 'lightgrey', marginTop: 20,}}> Napravit da se google,apple i facebookon moze loginat</Text>
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
  
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

    alignItems: 'center',
    marginTop: '20%',
    paddingVertical: 24,
    
    
  },

  loginInput:{
    borderColor:'#D0D0D0',
    borderWidth: 1.2,
    backgroundColor: '#E8E8E8',
    width: Dimensions.get('window').width * 0.86,
    height: Dimensions.get('window').height * 0.052,

    justifyContent: 'center',
    paddingLeft: 12,
    marginTop: 24,
    marginBottom: -12,
  },

  forgotPass:{
    // borderColor: 'blue',
    // borderWidth: 1.1,
    alignSelf: 'flex-end',
    marginRight: '7%',
    marginTop: 24,
  }
});
