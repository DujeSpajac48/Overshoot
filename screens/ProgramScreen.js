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
  Alert
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import TreningBlok from '../components/TreningBlok';
import { useRoute } from '@react-navigation/native';
import initDB from '../SQLite/database';

export default function ProgramScreen() {

  // Stoperica
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
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

  // PODACI IZ RUTE
  const { dayNum, userId, id: dayId } = useRoute().params;

  // Trening blokovi
  const [trening, setTrening] = useState([
    { id: Date.now(), name: '', setNum: '', Load: '', Reps: '', Rpe: '', dayId }
  ]);

  const treningPressHandler = () => {
    setTrening(prev => [
      ...prev,
      { id: Date.now(), name: '', setNum: '', Load: '', Reps: '', Rpe: '', dayId }
    ]);
  };

  const deleteTrening = (idToRemove) => {
    if (trening.length > 1) {
      setTrening(prev => prev.filter(item => item.id !== idToRemove));
    }
  };

  const updateExercise = (id, field, value) => {
    setTrening(prev =>
      prev.map(ex =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const saveExercisesToDB = async () => {
    const db = await initDB();
    try {
      for (const exercise of trening) {
        await db.runAsync(
          `INSERT INTO vjezba (name, setNum, Load, Reps, Rpe, dayId)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [exercise.name, exercise.setNum, exercise.Load, exercise.Reps, exercise.Rpe, dayId]
        );
      }
      Alert.alert('Uspjeh', 'Vježbe su spremljene!');
    } catch (e) {
      console.error('Greška pri spremanju:', e);
      Alert.alert('Greška', 'Spremanje nije uspjelo.');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.dayText}>Day {dayNum}</Text>
          </View>
          <Pressable
            onPress={handleStartStop}
            style={({ pressed }) => [styles.stopericaContainer, pressed && styles.pressedStyle]}
          >
            <View>
              <Text style={styles.startStopText}> {!isRunning ? 'Start' : 'Stop'}</Text>
              <Text> {formatTime(time)}</Text>
            </View>
          </Pressable>
          <Pressable onPress={saveExercisesToDB}>
            <Text style={styles.dayText}>Save</Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={30}
        >
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
                  onChange={updateExercise}
                  data={item}
                />
              ))}
            </ScrollView>
          </TouchableWithoutFeedback>
          <Button onPress={treningPressHandler} title="Add exercise" />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  headerContainer: {
    borderBottomWidth: 0.2,
    borderColor: '#555555',
    height: '8%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  startStopText: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  pressedStyle: {
    transform: [{ scale: 1.1 }]
  },
  container: {},
  contentContainer: {
    paddingBottom: 24,
  },
});
