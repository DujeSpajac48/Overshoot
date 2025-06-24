import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';


//ovo je da je samo 1 "kanal" otvoren na bazu 😌
let dbConn = null; 
const initDB = async () => {
  try {
    if (dbConn) {

      return dbConn;
    }

    dbConn = await SQLite.openDatabaseAsync('NewBlock.db');
    console.log('Database opened:', dbConn);

    // USERs tablica
    await dbConn.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        split TEXT NOT NULL,
        duration INTEGER NOT NULL,
        focus TEXT NOT NULL,
        diff TEXT NOT NULL,
        image TEXT,
        createdAt TEXT DEFAULT (DATE('now'))
      );
    `);

    // WEEKS tablica
    await dbConn.execAsync(`
      CREATE TABLE IF NOT EXISTS weeks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        weekNum INTEGER NOT NULL,
        userId INTEGER,
        createdAt TEXT DEFAULT (DATE('now')),
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    // DAYS tablica
    await dbConn.execAsync(`
      CREATE TABLE IF NOT EXISTS day (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dayNum INTEGER NOT NULL,
        weekId INTEGER,
        muscleGroup TEXT NOT NULL,
        FOREIGN KEY (weekId) REFERENCES weeks(id)
      );
    `);

    //info o vjezbi
    await dbConn.execAsync(`
      CREATE TABLE IF NOT EXISTS vjezba(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         setNum INTEGER NOT NULL,
         Load INTEGER NOT NULL,
         Reps INTEGER NOT NULL,
         Rpe INTEGER NOT NULL

      );`);

    console.log('All tables created.');
    return dbConn;
  } catch (e) {
    console.error('Greška pri otvaranju baze:', e);
    Alert.alert('Greška', 'Greška pri otvaranju baze');
    return null;
  }
};

export default initDB;
