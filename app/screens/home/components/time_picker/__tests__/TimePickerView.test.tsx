import 'react-native';

import {renderHook, act} from '@testing-library/react-hooks';
import useTimePickerViewModel from '../TimePickerViewModel';

it('shoud update alarm when event type be "set"', () => {

  const alarm = {id: 0, time: new Date(1687817628067), active: true, periodicity: 'testing'};
  
  const fnAction = jest.fn();
  const fnWhenFinish = jest.fn();
  
  const {result, waitFor} = renderHook(() => 
    useTimePickerViewModel( alarm, fnAction , fnWhenFinish ));

  act(() => result.current.onChange({type: 'set'}, new Date(1)));

  expect(fnAction).toBeCalledTimes(1);
  expect(fnWhenFinish).toBeCalledTimes(1);

});

it('shoud only call whenFinish function', () => {

  const alarm = {id: 0, time: new Date(1687817628067), active: true, periodicity: 'testing'};
  
  const fnAction = jest.fn();
  const fnWhenFinish = jest.fn();
  
  const {result, waitFor} = renderHook(() => 
    useTimePickerViewModel( alarm, fnAction , fnWhenFinish ));

  act(() => result.current.onChange({type: 'anythingElse'}, new Date(1)));

  expect(fnAction).toBeCalledTimes(0);
  expect(fnWhenFinish).toBeCalledTimes(1);
  
});