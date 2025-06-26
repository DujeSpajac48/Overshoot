import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

// ovo je da je samo 1 "kanal" otvoren na bazu 😌
let dbConn = null;

const initDB = async () => {
  try {
    if (dbConn) {
      return dbConn;
    }

    dbConn = await SQLite.openDatabaseAsync('NewBlock.db');
    console.log('Database opened:', dbConn);
    
    
    // await dbConn.execAsync(`DROP TABLE IF EXISTS workouts`);
    // await dbConn.execAsync(`DROP TABLE IF EXISTS day`);
    // await dbConn.execAsync(`DROP TABLE IF EXISTS weeks`);
    // await dbConn.execAsync(`DROP TABLE IF EXISTS users`);
    // USERs tablica
    //

    //users tablica, tribalo bi pisat blok, al san sjeba
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
      
    `
  );

    // WeeKS tablica
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
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (weekId) REFERENCES weeks(id)
      );
    `);

    // VJEŽBE tablica - workouts
    await dbConn.execAsync(`
      CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        setNum INTEGER DEFAULT 1,
        load INTEGER,
        reps INTEGER,
        rpe INTEGER,
        userId INTEGER,
        weekId INTEGER,
        exerNum INTEGER,
        dayId INTEGER,
        createdAt TEXT DEFAULT (DATE('now')),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (weekId) REFERENCES weeks(id),
        FOREIGN KEY (dayId) REFERENCES day(id)
      );
    `);
    

    console.log('All tables created.');
    return dbConn;
  } catch (e) {
    console.error('Greška pri otvaranju baze:', e);
    Alert.alert('Greška', 'Greška pri otvaranju baze');
    return null;
  }
};

export default initDB;
