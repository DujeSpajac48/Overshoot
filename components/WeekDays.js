import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import SmileBorder from './smiley';
import { useState, useEffect } from 'react';
import DaysPreset from './DayPreset';
import { useRoute } from '@react-navigation/native';
import initDB from '../SQLite/database';
import { useCallback } from 'react';
export default function WeekDays({ id, userId }) {
   const [dayCnt, setDayCnt] = useState(0);
   const [weekId, setWeekId] = useState(null);
 
  
   const getOrCreateWeekId = useCallback(async (dbConn, weekNum) => {
     try {
       //peca user id da bi svaki program bia zaseban
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
       console.error('Get or create wk neradi opet:', e);
       return null;
     }
   }, [userId]);
 
   const fetchDayCount = useCallback(async (weekId) => {
     try {
       const db = await initDB();
       const result = await db.getAllAsync(
         `SELECT COUNT(*) as count FROM day WHERE weekId = ?`,
         [weekId]
       );
       setDayCnt(result[0].count || 0);
     } catch (e) {
       console.error('Day cnt :', e);
     }
   }, []);
 
   useEffect(() => {
     const loadWeekData = async () => {
       try {
         const dbConn = await initDB();
         const actualWeekId = await getOrCreateWeekId(dbConn, id);
         
         if (actualWeekId) {
           setWeekId(actualWeekId);
           await fetchDayCount(actualWeekId);
         }
       } catch (e) {
         console.error('Error week data:', e);
       }
     };
 
     if (userId) loadWeekData();
   }, [id, userId, getOrCreateWeekId, fetchDayCount]);
 
   //dodaje jos 1 dan on click
   const handleAddDay = async () => {
     try {
       const dbConn = await initDB();
       

       const actualWeekId = weekId || await getOrCreateWeekId(dbConn, id);
       
       if (!actualWeekId) {
         Alert.alert("Error", "Nije napravilpo week");
         return;
       }
 
       //day num
       const days = await dbConn.getAllAsync(
         `SELECT COUNT(*) AS count FROM day WHERE weekId = ?`,
         [actualWeekId]
       );
       const nextDayNum = (days[0]?.count || 0) + 1;
 
       //ubaxuje novi dan
       await dbConn.runAsync(
         `INSERT INTO day (dayNum, weekId, muscleGroup) VALUES (?, ?, ?)`,
         [nextDayNum, actualWeekId, 'Push']
       );
 
       if (!weekId) setWeekId(actualWeekId);
       setDayCnt(prev => prev + 1);
       
     } catch (e) {
       console.error('Nije uspija dodat day:', e);
       Alert.alert("Day + erro", "Nije doda day");
     }
   };
 

   const handleRemoveDay = async () => {
     if (!weekId || dayCnt <= 1) {
       Alert.alert("Warning", "Must have at least one day");
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
         setDayCnt(prev => prev - 1);
       }
     } catch (e) {
       console.error('Error removing day:', e);
     }
   };
 
 

  return (
    <>
      <View style={styles.headerTextContainer}>
        <Text style={{ fontSize: 40 }}>Week {id}</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.daysContainer}>
          
          {[...Array(dayCnt)].map((_, index) => (
            <DaysPreset key={index} dayNum={index + 1} />
          ))}

          <View style={styles.butttonContainer}>
            <Pressable style={styles.addDay} onPress={handleRemoveDay}>
              <Icon name="close-circle-outline" size={36} color={'red'} />
            </Pressable>
             <Pressable
               style={styles.addDay}
               onPress={weekId ? handleAddDay : null} // ne dozvoli klik ako nema weekId  maknit kad proradi
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
