import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

import TimePickerView from '../TimePickerView';
import TimePickerModel from '../TimePickerModel';

jest.mock("../TimePickerViewModel", () => {
  const fnTimePickerViewModel = jest.fn();
  fnTimePickerViewModel.mockImplementation(
    () => ({
      date: new Date(123456789),
      onChange: jest.fn()
    } as TimePickerModel),
  );

  return fnTimePickerViewModel;
  
});

import useTimePickerViewModel from '../TimePickerViewModel';


it('shoud render correctly', () => {

  const props = {
    alarm: { id: 0, time: new Date(), active: false, periodicity: 'every day' },
    action: jest.fn(),
    whenFinish: jest.fn()
  };

  const {toJSON} = renderer.create(<TimePickerView {...props}/>);
  expect(toJSON()).toMatchSnapshot();
  
});