import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import HomeView from '../HomeView';
import HomeModel from '../HomeModel';

jest.mock('../HomeViewModel', () => {
  const fnHomeViewModel = jest.fn();
  fnHomeViewModel.mockImplementation(
    () => ({
      alarms: [{ id: 0, time: new Date(123456788), active: false, periodicity: 'every day' },
               { id: 1, time: new Date(123456799), active: true, periodicity: 'every day' }],
      addAction: jest.fn(),
      showTimePick: true,
      setShowTimePick: jest.fn(),
      newAlarm: { id: 0, time: new Date(123456789), active: false, periodicity: 'every day' },
      setNewAlarm: jest.fn(),
      openTimePickDialog: jest.fn(),
      setShouldRefreshAlarms: jest.fn()
    } as HomeModel),
  );

  return fnHomeViewModel;

});

import useHomeViewModel from '../HomeViewModel';
import { fireEvent, render, screen } from '@testing-library/react-native';

it('shoud render correctly', () => {

  const props = {
    navigation: jest.fn()
  };

  const {toJSON} = renderer.create(<HomeView {...props} />);
  expect(toJSON()).toMatchSnapshot();

});

it('should navigate to About page', () => {

  const navigateFn = jest.fn();

  const navigationMock = {navigation: {navigate: navigateFn}};

  render(<HomeView {...navigationMock}/>)

  fireEvent.press(screen.getByTestId('navigateToAbout'));

  expect(navigateFn).toBeCalledWith('About');

});