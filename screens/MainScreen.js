import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import ProgramButtonRedizajn from '../components/MainScreenComponents/ProgramButtonRedizajn';
import Colors from '../constants/Colors';
import SelectionBar from '../components/SelectionBar';
import { useNavigation } from "@react-navigation/native";


export default function MainScreen() {
  const navigation= useNavigation();
  const [day, setDay] = useState([
    { 
      id: Date.now(),
      title: "Legs",
      difficulty: "Beginner",
      duration: "30-60",
      programType: "Powerlifting",
      date: "1.12.2025",
      children: "Coach Tony"
    },
    { 
      id: Date.now() + 1,
      title: "Chest",
      difficulty: "Intermediate",
      duration: "60-90",
      programType: "Bodybuilding",
      date: "2.10.2024",
      children: "Ognjen Durdevic"
    },
    { 
      id: Date.now() + 2,
      title: "Back",
      difficulty: "Advanced",
      duration: "30-60",
      programType: "Functional",
      date: "1.11.2025",
      children: "Moja mama"
    }
  ]);
  
  function addWorkoutDay() {
    const newWorkout = {
      id: Date.now(),
      title: "New Workout",
      difficulty: "Beginner",
      duration: "30-60",
      programType: "General",
      date: new Date().toLocaleDateString(),
      children: "You"
    };
    setDay(prev => [...prev, newWorkout]);
  }
  
  function deleteWorkoutDay(idToRemove) {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => setDay(prev => prev.filter(item => item.id !== idToRemove)) 
        },
      ]
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerContainer}>
          <Text style={styles.textStyle}>OVER</Text>
          <Text style={styles.textStyleShot}>SHOOT</Text>
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          <View style={styles.workoutButtonContainer}>
            <View style={styles.deleteButton}>
              <Pressable onPress={() => {
                if (day.length > 0) {
                  deleteWorkoutDay(day[0].id);
                }
              }}>
                <Text style={{color: 'white'}}>Delete Workout</Text>
              </Pressable>
            </View>

            <View style={styles.newButton}>
              {/* <Pressable onPress={addWorkoutDay}> */}
              < Pressable  onPress={()=> navigation.navigate('NewWorkoutScreen')}>  
                <Text style={{color: 'white'}}>New Workout</Text>
              </Pressable>
            </View>
          </View>

          {day.map((item) => (
            <ProgramButtonRedizajn
              key={item.id}
              id={item.id}
              title={item.title}
              difficulty={item.difficulty}
              duration={item.duration}
              programType={item.programType}
              date={item.date}
              children={item.children}
              onDelete={deleteWorkoutDay}
            />
          ))}
        </ScrollView>
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
    // borderColor: 'red',
    // borderWidth: 1,

    flex:1,
    alignContent: 'center',
    backgroundColor: '#f6f6f9',
  },
  topButton:{
    width: '100%' 
  },
  addProgramContainer:{
    borderWidth: 1,
    width: '100%',
    // height: '3%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
    // padding: 10
  },
  headerContainer:{
    alignItems: 'center',
    padding: 4,
    fontSize: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    marginHorizontal: '7%',
    backgroundColor: '#f6f6f9'
  },
  textStyle:{
    fontSize: 40,
    fontWeight: 'bold',
    color:'darkred',
    
    
  },
  textStyleShot:{
    fontSize: 36,
    fontWeight: 'bold',
    color:'lightblue'
  },
  scrollContainer:{
    // borderColor: 'blue',
    // borderWidth: 1,
    backgroundColor: Colors.mainBackground,
    flexGrow: 1,
    alignItems: 'center'
  },
  scrollView:{
    flex: 1,
  },

  workoutButtonContainer:{
    // borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '6%',
    maxHeight: '6%',
    marginTop: 8,
  },

  
  deleteButton:{
    backgroundColor: 'darkred',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    width: '32%'

  },

  newButton:{
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    width: '32%'

  },
});