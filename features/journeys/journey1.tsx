import React from 'react';
import {FirstScreen} from '../screen1';
import {SecondScreen} from '../screen2';
import {ThirdScreen} from '../screen3';
import {createStackNavigator} from '@react-navigation/stack';
import {ForthScreen} from '../screen4';

const Stack = createStackNavigator();

export const FirstJourney = () => (
  <Stack.Navigator>
    <Stack.Screen name={'Screen1'} component={FirstScreen} />
    <Stack.Screen name={'Screen2'} component={SecondScreen} />
    <Stack.Screen name={'Screen3'} component={ThirdScreen} />
    <Stack.Screen name={'Screen4'} component={ForthScreen} />
  </Stack.Navigator>
);
