import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SeparatorView from '../SeparatorView';

it('renders correctly', () => {
 const {toJSON} = renderer.create(<SeparatorView />);
 expect(toJSON()).toMatchSnapshot();
});