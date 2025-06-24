import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useEffect } from 'react';
import Colors from '../constants/Colors';
import TreningBlok from '../components/TreningBlok';
import ExitButton from '../components/ExitButton';
import { useState } from 'react';

export default function ProgramScreen() {

  // stvari za stopericu
  const [isRunning,setIsRunning] = useState(false);
  const [time,setTime] = useState(0);

  const handleStartStop =()=>{
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10); // 10ms
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);


  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);


    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };


//stvari za trening
  const [trening, addTrening] = useState([{ id: Date.now() }]);


  function treningPressHandler() {
    addTrening(prev => [...prev, { id: Date.now() }]);
  }

  function deleteTrening(idToRemove) {
    if (trening.length > 1) {
      addTrening(prev => prev.filter(item => item.id !== idToRemove));
    }
  }
  // ---------------------------------------

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top','bottom']}>

        <View style={styles.headerContainer}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>Day 1</Text>
          </View>
          <Pressable
          onPress={handleStartStop}
          style={({ pressed })=>[styles.stopericaContainer,
            pressed && styles.pressedStyle]
          }>
          <View >
            <Text style={styles.startStopText}> {!isRunning ?'Start':'Stop'}</Text>
            <Text> {formatTime(time)}</Text>
          </View>
          </Pressable>
          <View style={styles.SaveContainer}>
            <Text style={styles.dayText}> Save</Text>

          </View>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 30} 
        >
          {/* Tap izvan inputa = zatvori tipkovnicu */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
            >

              {trening.map(item => (
                <TreningBlok
                  key={item.id}
                  id={item.id}
                  toDelete={deleteTrening}
                />
              ))}


            </ScrollView>

          </TouchableWithoutFeedback>
          <Button onPress={treningPressHandler} title="Add exercise" />

        </KeyboardAvoidingView>
        {/* ------------------------------------ */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  buttonOverWrite: {
    justifyContent: 'flex-start',
    marginRight: 50,
  },
  flexEnd: {
    width: '100%',
    marginLeft: 10,
    flexDirection: 'row',
    gap: 40,
  },
  headerContainer: {
    borderBottomWidth: 0.2,
    borderColor: '#555555',
    height: '8%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dayContainer:{
    
  },
  dayText:{
    fontWeight: 'semibold',
    fontSize: 20
  },
  headerText: {
    paddingLeft: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  startStopText:{
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  pressedStyle:{
    transform: [{scale: 1.1}]
  },
  container: {
    // flex: 1,
  },

  contentContainer: {
    // flexGrow: 1,
    paddingBottom: 24, // malo zraka ispod zadnjeg inputa
  },
});
