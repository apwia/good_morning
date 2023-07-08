import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

import Alarm from '../model/Alarm';

enablePromise(true);

const tableName = 'alarmsData';

export const getDbConnection = async (): Promise<SQLiteDatabase> => {

  console.log('getting db connection');
  
  return openDatabase({
    name: "alarm-clock.db",
  });

};

export const createTable = async (db: SQLiteDatabase) => {

  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName} ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    time TIMESTAMP, 
    active BOOLEAN, 
    periodicity VARCHAR (50) 
    )`;

  try {
    await db.executeSql(query);
    console.log("table created successfully");
  } catch(error: any){
    console.error("error on creatinng table "+ tableName + " " + error.message);
  }

};

export const getAlarms = async (db: SQLiteDatabase): Promise<Alarm[]> => {

  console.log('getting alarms');

  try {

    const alarmItems: Alarm[] = [];

    const results = await db.executeSql(`SELECT id, time, active, periodicity FROM ${tableName}`);
    
    results.forEach(result => {

      for (let index = 0; index < result.rows.length; index++) {

        const alarm = result.rows.item(index);
        alarm.active = alarm.active === "true";
        alarmItems.push(alarm);
        
      }

    });

    return alarmItems;

  } catch (error: any) {
    console.error("error getting alarms " + error.message);
    throw Error('Failed to get alarms :(' + error.message);
  }
};

export const saveAlarm = async (db: SQLiteDatabase, alarm: Alarm) => {
  const insertQuery =
      `INSERT INTO ${tableName}(time, active, periodicity) 
       VALUES ('${alarm.time}', '${alarm.active}', '${alarm.periodicity}')`;

  try {
    const returnValue = await db.executeSql(insertQuery);
    console.log("alarm inserted successfully " + returnValue.length);
  } catch(error: any){
    console.error("error on inserting alarm. "+ error.message);
  }
};

export const updateAlarm = async (db: SQLiteDatabase, alarm: Alarm) => {

  let conditions = "";

  if(!alarm.id) 
    console.error("invalid alarm id");

  if(alarm.active != undefined)
    conditions += " active='" + alarm.active +"', ";

  if(alarm.periodicity)
    conditions += " periodicity='" + alarm.periodicity +"', ";

  if(alarm.time)
    conditions += " time='" + alarm.time +"' ";

  const updateQuery = 
      `UPDATE ${tableName} 
       SET 
       ${conditions} 
       WHERE id='${alarm.id}'`;
  
  try {
    const returnValue = await db.executeSql(updateQuery);
    console.log("alarm updated successfully " + returnValue.length);
  } catch(error: any) {
    console.error("error on updating alarm. "+ error.message);
  }
    
}

export const deleteAlarm = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  
  try {
    const returnValue = await db.executeSql(deleteQuery);
    console.log("values deleted successfully " + returnValue);
  } catch(error: any){
    console.error("error on deleting alarm. "+ error.message);
  }

};

export const clearTable = async (db: SQLiteDatabase) => {
  const query = `DROP table ${tableName}`;

  await db.executeSql(query);
};