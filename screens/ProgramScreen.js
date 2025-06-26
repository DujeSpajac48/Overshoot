
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

import { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import Workout from '../components/Workout';

import { useRoute } from '@react-navigation/native';


import * as SQLite from 'expo-sqlite';
import initDB from '../SQLite/database';

export default function ProgramScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')} : ${minutes
      .toString()
      .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  const [trening, addTrening] = useState([{ id: Date.now() }]);

  function treningPressHandler() {
    addTrening((prev) => [...prev, { id: Date.now() }]);
  }

  function deleteTrening(idToRemove) {
    if (trening.length > 1) {
      addTrening((prev) => prev.filter((item) => item.id !== idToRemove));
    }
  }

  const { dayNum, userId, workoutId, dayId } = useRoute().params;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.headerContainer}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>Day {dayNum}</Text>
          </View>
          <Pressable
            onPress={handleStartStop}
            style={({ pressed }) => [
              styles.stopericaContainer,
              pressed && styles.pressedStyle,
            ]}
          >
            <View>
              <Text style={styles.startStopText}>
                {!isRunning ? 'Start' : 'Stop'}
              </Text>
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
            >
              {trening.map((item) => (
                <Workout
                  userId={userId}
                  workoutId={workoutId}
                  dayId={dayId}
                  key={item.id}
                  id={item.id}
                  toDelete={deleteTrening}
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
    alignItems: 'center',
  },
  dayContainer: {},
  dayText: {
    fontWeight: 'semibold',
    fontSize: 20,
  },
  headerText: {
    paddingLeft: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  startStopText: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  pressedStyle: {
    transform: [{ scale: 1.1 }],
  },
  container: {},
  contentContainer: {
    paddingBottom: 24,
  },
});
