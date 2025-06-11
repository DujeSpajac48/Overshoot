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
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import TreningBlok from '../components/TreningBlok';
import ExitButton from '../components/ExitButton';
import { useState } from 'react';

export default function ProgramScreen() {
  // ------- state blokovi -----------------
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
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style="auto" />

        {/* ---------- header ---------- */}
        <View style={styles.flexEnd}>
          <ExitButton style={styles.buttonOverWrite}>Exit</ExitButton>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Week 1, D1</Text>
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
    borderBottomWidth: 0.5,
    marginBottom: 20,
    opacity: 0.7,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#B65E00',
    width: '85%',
    borderBottomLeftRadius: 14,
  },
  headerText: {
    paddingLeft: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    // flex: 1,
  },

  contentContainer: {
    // flexGrow: 1,
    paddingBottom: 24, // malo zraka ispod zadnjeg inputa
  },
});
