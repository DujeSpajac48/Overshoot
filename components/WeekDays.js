import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import SmileBorder from './smiley';
import { useState, useEffect, useCallback } from 'react';
import DayPreset from './DayPreset';
import { useIsFocused, useRoute, useNavigation } from '@react-navigation/native';
import initDB from '../SQLite/database';
import { SQLiteDatabase } from 'expo-sqlite';


//animacija
import { SlideInLeft } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';



export default function WeekDays({ id, userId }) {
  const [weekId, setWeekId] = useState(null);
  const [days, setDays] = useState([]); // lista svih dana
  const [db, setDb] = useState(null);
  const [Program, setProgram] = useState([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getOrCreateWeekId = useCallback(async (dbConn, weekNum) => {
    try {
      const existing = await dbConn.getFirstAsync(
        `SELECT id FROM weeks WHERE weekNum = ? AND userId = ?`,
        [weekNum, userId]
      );

      if (existing?.id) return existing.id;

      const { lastInsertRowId } = await dbConn.runAsync(
        `INSERT INTO weeks (weekNum, userId) VALUES (?, ?)`,
        [weekNum, userId]
      );

      return lastInsertRowId;
    } catch (e) {
      console.error('Get or create week error:', e);
      return null;
    }
  }, [userId]);
  
  const fetchDays = useCallback(async (weekId) => {
    try {
      const db = await initDB();
      const result = await db.getAllAsync(
        `SELECT * FROM day WHERE weekId = ? ORDER BY dayNum ASC`,
        [weekId]
      );
      setDays(result); // Spremamo prave podatke iz baze
    } catch (e) {
      console.error('Greška kod dohvata dana:', e);
    }
  }, []);

  useEffect(() => {
    const loadWeekData = async () => {
      try {
        const dbConn = await initDB();
        const actualWeekId = await getOrCreateWeekId(dbConn, id);

        if (actualWeekId) {
          setWeekId(actualWeekId);
          await fetchDays(actualWeekId);
        }
      } catch (e) {
        console.error('Error loading week data:', e);
      }
    };

    if (userId) loadWeekData();
  }, [id, userId, getOrCreateWeekId, fetchDays]);

  const handleAddDay = async () => {
    try {
      const dbConn = await initDB();
      const actualWeekId = weekId || await getOrCreateWeekId(dbConn, id);

      if (!actualWeekId) {
        Alert.alert("Error", "Nije napravljen tjedan");
        return;
      }

      const daysResult = await dbConn.getAllAsync(
        `SELECT COUNT(*) AS count FROM day WHERE weekId = ?`,
        [actualWeekId]
      );
      const nextDayNum = (daysResult[0]?.count || 0) + 1;

    } catch (e) {
      console.error('Neuspješno dodavanje dana:', e);
      Alert.alert("Greška", "Nije dodan dan");
    }
  };




  const handleRemoveDay = async () => {
    if (!weekId || days.length <= 1) {
      Alert.alert("Upozorenje", "Mora postojati barem jedan dan");
      return;
    }

    try {
      const db = await initDB();
      const result = await db.getAllAsync(
        `SELECT id FROM day WHERE weekId = ? ORDER BY dayNum DESC LIMIT 1`,
        [weekId]
      );

      if (result.length > 0) {
        await db.runAsync(`DELETE FROM day WHERE id = ?`, [result[0].id]);
        await fetchDays(weekId);
      }
    } catch (e) {
      console.error('greska  brisanje dana:', e);
    }
  };

  useEffect(() => {
    const loadDB = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('NewBlock.db');
        setDb(database);
      } catch (e) {
        Alert.alert("Greška", "Baza se nije otvorila: LoadDB", e);
      }
    };
    loadDB();
  }, []);

  useEffect(() => {
    if (!db) return;

    const fetchData = async () => {
      try {
        const data = await db.getAllAsync('SELECT * FROM workouts ORDER BY createdAt ASC');
        setProgram(data);
        console.log('Baza workouts name : ', data);
      } catch (e) {
        Alert.alert("Greška", "Name nije učitan");
        console.log('Name zaron: ', e);
      }
    };

    fetchData();
  }, [db, isFocused]);

//uljece ko raketa
  const [justAddedDayId, setJustAddedDayId] = useState(null);

  return (
    <>
      <Animatable.View 

      style={styles.headerTextContainer}
      animation='slideInLeft'
      duration={500}>
        <Text style={{ fontSize: 40 }}>Week {id}</Text>
      </Animatable.View>

      <View style={styles.mainContainer}>
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
              <DayPreset
              
            key={day.id}  
              dayNum={day.dayNum}
              muscleGroup={day.muscleGroup}
              id={id}
              userId={userId}
              onPress={() => {
                navigation.navigate('Program', {
                  userId: userId,
                  dayId: day.id,
                  dayNum: day.dayNum
                });
              }}
            />
          ))}

          <View style={styles.butttonContainer}>
            <Pressable style={styles.addDay} onPress={handleRemoveDay}>
              <Icon name="close-circle-outline" size={36} color={'red'} />
            </Pressable>
            <Pressable
              style={styles.addDay}
              onPress={weekId ? handleAddDay : null}
            >
              <Icon name="add-circle-outline" size={36} color={weekId ? 'green' : 'gray'} />
            </Pressable>
          </View>

          <SmileBorder />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerTextContainer: {
    marginTop: 12,
    paddingLeft: 20,
  },
  daysContainer: {
    height: '100%',
    alignItems: 'center',
  },
  addDay: {},
  butttonContainer: {
    flexDirection: 'row',
    width: '48%',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
});
