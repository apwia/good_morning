
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useStartUp from './hooks/useStartUp';

import Home from './screens/home/Home';
import About from './screens/about/About';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {

  useStartUp();

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="About" component={About} options={{title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;