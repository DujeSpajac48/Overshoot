import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseAsync('NewBlock.db');

// F za spremanje podataka u workout
export const saveWorkoutData = (userId, dayId, workoutId, setNum, reps, load, rpe) => {

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO workouts (name, setNum, reps, load, rpe, userId, dayId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [workoutId, setNum, reps, load, rpe, userId, dayId],
      (_, result) => {
        console.log(' saved to workouts:', result);
      },
      (_, error) => {
        console.error('Error   o workouts:', error);
        return false;
      }
    );
  });
};
