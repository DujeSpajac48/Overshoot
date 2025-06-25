import * as SQLite from 'expo-sqlite';

let dbConn = null;
const getDB = async () => {
  if (!dbConn) {
    dbConn = await SQLite.openDatabaseAsync('NewBlock.db');
  }
  return dbConn;
};

export const getLastWorkoutName = async (userId, dayId) => {
  try {
    const db = await getDB();

    const result = await db.getAllAsync(
      `SELECT name FROM workouts WHERE userId = ? AND dayId = ? ORDER BY createdAt DESC LIMIT 1`,
      [userId, dayId]
    );

    if (result.length > 0) {
      return result[0].name;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Greška pri dohvaćanju vježbe:', err);
    return null;
  }
};
