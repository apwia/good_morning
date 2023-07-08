import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import AboutView from '../components/AboutView';
import AboutModel from '../components/AboutModel';


jest.mock('../components/AboutViewModel', () => {
  const fnAboutViewModel = jest.fn();
  fnAboutViewModel.mockImplementation(
    () => 
      ({
        title: "test title",
        texts: ["text1", "text2", "text3"],
        urlGitHub: "testUrl.com"
       } as AboutModel),
  );

  return fnAboutViewModel;
  
});

import useAboutViewModel from '../components/AboutViewModel';
import { fireEvent, render, screen } from '@testing-library/react-native';

it('renders correctly', () => {
  const {toJSON} = renderer.create(<AboutView />);
  expect(toJSON()).toMatchSnapshot();
});

it('should redirect to some page', () => {
  const consoleSpy = jest.spyOn(console, 'log');

  jest.mock('react-native/Libraries/Linking/Linking', () => ({
    openURL: jest.fn((param) => console.log(param)),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

  render(<AboutView/>);

  fireEvent.press(screen.getByTestId('link'));

  expect(consoleSpy).toHaveBeenCalledWith("testUrl.com");

});