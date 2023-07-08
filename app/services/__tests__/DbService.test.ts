import 'react-native';

import { deleteAlarmService, getAlarmsService, saveAlarmService, updateAlarmService } from '../DbService';

const logSpy = jest.spyOn(console, 'error');

jest.mock('../../repository/DbRepository', () => {

  const originalModule = jest.requireActual('../../repository/DbRepository');

  return {
    __esmodule: true,
    ...originalModule,
    default: [],
    updateAlarm: jest.fn(),
    deleteAlarm: jest.fn(),
    saveAlarm: jest.fn(),
    getAlarms: jest.fn(() => ([{id: 1, time: new Date(1), active: false, periodicity: 'testing newer'},
                              {id: 2, time: new Date(2), active: false, periodicity: 'testing older'}])),
    getDbConnection: jest.fn(),
  }
  
});

import { deleteAlarm, getAlarms, getDbConnection, saveAlarm, updateAlarm } from "../../repository/DbRepository";

// @ts-ignore
beforeEach(() => getDbConnection.mockReset());

it('shoud update an alarm', async () => {

  const alarm = {id: 0, time: new Date(1), active: false, periodicity: 'testing'};

  await updateAlarmService(alarm);

  expect(getDbConnection).toBeCalledTimes(1);

  expect(updateAlarm).toHaveBeenCalled();
  
});

it('shoud send error when invalid alarm trying to update', () => {

  // @ts-ignore
  updateAlarmService();

  expect(logSpy).toHaveBeenCalledWith('invalid alarm to update');

});

it('shoud delete an alarm', async () => {

  await deleteAlarmService(1);

  expect(getDbConnection).toBeCalledTimes(1);

  expect(deleteAlarm).toHaveBeenCalled();
  
});


it('shoud save an alarm', async () => {

  const alarm = {id: 0, time: new Date(1), active: false, periodicity: 'testing'};

  await saveAlarmService(alarm);

  expect(getDbConnection).toBeCalledTimes(1);

  expect(saveAlarm).toHaveBeenCalled(); 
});

it('shoud send error when invalid alarm trying to save', () => {

  // @ts-ignore
  saveAlarmService();

  expect(logSpy).toHaveBeenCalledWith('invalid alarm to save');

});


it('shoud get alarms and order by time', async () => {

  const result = await getAlarmsService();

  expect(result[0].id).toEqual(1);
  expect(result[1].id).toEqual(2);

});