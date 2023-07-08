import 'react-native';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import AlarmView from '../AlarmView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AlarmModel from '../AlarmModel';

jest.mock('../AlarmViewModel', () => {
  const fnAlarmViewModel = jest.fn();
  fnAlarmViewModel.mockImplementation(
    () => ({
      updateAction: jest.fn(),
      toggleActiveAction: jest.fn(),
      showTimePick: true,
      setShowTimePick: jest.fn(),
      isActive: true, 
      displayedTime: '12:00',
      removeAlarmAlert: jest.fn(),
    } as AlarmModel),
        
  );

  return fnAlarmViewModel;

});

import useAlarmViewModel from '../AlarmViewModel';

it('should renders correctly', () => {

  const alarm = {	id: 0, time: new Date(1687817628067), active: true, periodicity: 'testing'};

  const props = {alarm: alarm, setShouldRefreshAlarms: jest.fn()}

  const {toJSON} = renderer.create(<AlarmView {...props}/>);
  expect(toJSON()).toMatchSnapshot();

});


it('should render datePick clicking on the text', () => {

  const setShowTimePickFn = jest.fn();

  // @ts-ignore
  useAlarmViewModel.mockImplementation(
    () => ({
      updateAction: jest.fn(),
      toggleActiveAction: jest.fn(),
      showTimePick: true,
      setShowTimePick: setShowTimePickFn,
      isActive: true, 
      displayedTime: '12:00',
      removeAlarmAlert: jest.fn(),
    } as AlarmModel),
  );

  const alarm = {	id: 0, time: new Date(1), active: true, periodicity: 'testing'};

  render(<AlarmView alarm={alarm} setShouldRefreshAlarms={jest.fn()} />);

  fireEvent.press(screen.getByText('12:00'));
  
  expect(setShowTimePickFn).toBeCalledWith(true);

});

it('should call update action after clickin on switch button', () => {

  const toggleActiveActionFn = jest.fn();

  // @ts-ignore
  useAlarmViewModel.mockImplementation(
    () => ({
      updateAction: jest.fn(),
      toggleActiveAction: toggleActiveActionFn,
      showTimePick: true,
      setShowTimePick: jest.fn(),
      isActive: true, 
      displayedTime: '12:00',
      removeAlarmAlert: jest.fn(),
    } as AlarmModel),
  );

  const alarm = {	id: 0, time: new Date(1), active: true, periodicity: 'testing'};

  render(<AlarmView alarm={alarm} setShouldRefreshAlarms={jest.fn()} />);

  const switchComponent = screen.getByTestId('switch');

  fireEvent(switchComponent, 'onValueChange');
  
  expect(toggleActiveActionFn).toBeCalled();

});