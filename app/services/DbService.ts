import Moment from 'moment';

import Alarm from "../model/Alarm";
import { deleteAlarm, getAlarms, getDbConnection, saveAlarm, updateAlarm } from "../repository/DbRepository";

export const updateAlarmService = async (alarm: Alarm) => {
  
  if (!alarm) 
    return console.error('invalid alarm to update');
  
  const db = await getDbConnection();
  await updateAlarm(db, alarm);
    
};

export const deleteAlarmService = async (id: number) => {
  const db = await getDbConnection();
  await deleteAlarm(db, id);
};

export const saveAlarmService = async (alarm: Alarm) => {

  if (!alarm) 
    return console.error('invalid alarm to save');

  const db = await getDbConnection();
  await saveAlarm(db, alarm);
    
};

export const getAlarmsService = async () => {

  const db = await getDbConnection();

  const updatedAlarms = await getAlarms(db);

  const sortedAlarmsList = updatedAlarms.sort(
    (objA, objB) => 
      Number(+Moment(new Date(objA.time)).format('HHmm')) - 
      Number(+Moment(new Date(objB.time)).format('HHmm'))
  );

  return sortedAlarmsList;

};