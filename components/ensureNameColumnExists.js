import initDB from "../SQLite/database";
async function ensureNameColumnExists() {
   try {
     const dbConn = await initDB();
 
     // opostoji li stupac name
     const result = await dbConn.getAllAsync(`PRAGMA table_info(workouts);`);
     const hasNameColumn = result.some(column => column.name === 'name');
 
     if (!hasNameColumn) {
       //  name ne postoji dodaj 
       await dbConn.runAsync(`ALTER TABLE workouts ADD COLUMN name TEXT;`);
       console.log(" name je dodan.");
     } else {
       console.log(" name već postoji.");
     }
   } catch (e) {
     console.log("stupac PROBLEMMMMM :", e);
   }
 }

 export default ensureNameColumnExists;