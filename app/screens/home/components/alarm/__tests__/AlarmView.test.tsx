import 'react-native';

import {renderHook, act} from '@testing-library/react-hooks';

import useAlarmViewModel from '../AlarmViewModel';
import { Alert } from 'react-native';

it('shout open datePick dialog', async () => {

  const alarm = {id: 0, time: new Date(1687817628067), active: true, periodicity: 'testing'};

  const {result, waitFor} = renderHook(() => useAlarmViewModel(alarm, jest.fn()));

  act(() => {
    result.current.setShowTimePick(true);
  });

  await waitFor(() => result.current.showTimePick === true);

  expect(result.current.showTimePick).toBe(true);
  
});

jest.mock('../../../../../services/DbService', () => ({
  __esModule: true,
  default: [],
  deleteAlarmService: jest.fn(),
  updateAlarmService: jest.fn()
}));

import { deleteAlarmService, updateAlarmService } from "../../../../../services/DbService";

it('shout switch inactive to active alarm', async () => {

  const alarm = {id: 0, time: new Date(1687817628067), active: false, periodicity: 'testing'};

  const {result, waitFor} = renderHook(() => useAlarmViewModel(alarm, jest.fn()));

  act(() => result.current.toggleActiveAction());

  await waitFor(() => result.current.isActive === true);

  expect(result.current.isActive).toBe(true);
  expect(updateAlarmService).toBeCalledTimes(1);
  
});

it('shout update an alarm', async () => {

  const alarm = {id: 0, time: new Date(1687817628067), active: false, periodicity: 'testing'};

  const {result, waitFor} = renderHook(() => useAlarmViewModel(alarm, jest.fn()));

  act(() => {
    result.current.updateAction();
  });

  expect(updateAlarmService).toBeCalledTimes(2);

});


it('shoud delete an alarm', async () => {

  const alert = jest.spyOn(Alert, 'alert');
  
  const alarm = {id: 0, time: new Date(1687817628067), active: false, periodicity: 'testing'};

  const {result, waitFor} = renderHook(() => useAlarmViewModel(alarm, jest.fn()));

  act(() => {
    result.current.removeAlarmAlert();
  });

  // @ts-ignore
  alert.mock.calls[0][2][0].onPress();
  // @ts-ignore
  alert.mock.calls[0][2][1].onPress();

  expect(Alert.alert).toHaveBeenCalledWith(
    'Hey...',
    'Do you really want to delete this alarm ?',
     expect.any(Array),
  )

  expect(deleteAlarmService).toBeCalledTimes(1);

});
