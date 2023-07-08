import 'react-native';
import { clearTable, createTable, deleteAlarm, getAlarms, getDbConnection, saveAlarm, updateAlarm } from '../DbRepository';

const consoleSpy = jest.spyOn(console, 'log');

const alarmMock = {id: 2, time: new Date(2), active: false, periodicity: 'testing alarm2'};

const resultSetMock = { executeSql: (query: any) => ([{"rows":{"length":1, "item": () => alarmMock},"rowsAffected":0}])};

jest.mock('react-native-sqlite-storage', () => ({
  __esModule: true,
  default: [],
  // @ts-ignore
  openDatabase: jest.fn(() => (resultSetMock)).mockImplementationOnce((param: any) => param.name),
  enablePromise: jest.fn(),
}));

import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";
import Alarm from '../../model/Alarm';

it('should return db connection', async () => {
  const db = await getDbConnection();

  expect(db).toEqual('alarm-clock.db');
});

it('should create table', async () => {

  const db = await getDbConnection();

  console.log(db);

  await createTable(db);

  expect(consoleSpy.mock.calls).toContainEqual(['table created successfully']);

  expect((consoleSpy.mock.calls).toString().includes('CREATE TABLE'));

});

it('should get alarms', async () => {

  const db = await getDbConnection();

  const alarms = await getAlarms(db);

  expect((consoleSpy.mock.calls).toString().includes('SELECT'));

  expect(alarms).toEqual([alarmMock]);

});

it('should save alarms', async () => {

  const db = await getDbConnection();

  await saveAlarm(db, alarmMock);

  expect((consoleSpy.mock.calls).toString().includes('INSERT'));

});

it('should update an alarm', async () => {

  const db = await getDbConnection();

  updateAlarm(db, alarmMock);

  expect((consoleSpy.mock.calls).toString().includes('UPDATE'));

});

it('should validate alarm.id before update', async () => {

  const db = await getDbConnection();

  alarmMock.id = 0;

  updateAlarm(db, alarmMock);

  expect((consoleSpy.mock.calls).toString().includes('invalid alarm id'));

});

it('should delete an alarm', async () => {

  const db = await getDbConnection();

  deleteAlarm(db, 1);

  expect((consoleSpy.mock.calls).toString().includes('DELETE'));

});


it('should drop table', async () => {

  const db = await getDbConnection();

  clearTable(db);

  expect((consoleSpy.mock.calls).toString().includes('DROP'));

});