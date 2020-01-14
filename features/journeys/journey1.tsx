import React, {useEffect, useLayoutEffect} from 'react';
import {useMachine} from '@xstate/react';
import {Machine, interpret} from 'xstate';
import {FirstScreen} from '../screen1';
import {SecondScreen} from '../screen2';
import {ThirdScreen} from '../screen3';
import {createStackNavigator} from '@react-navigation/stack';
import {ForthScreen} from '../screen4';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {BackHandler} from 'react-native';
import {navigate} from '../../services/NavigationService';

const Stack = createStackNavigator();
const routeMachine = Machine({
  id: 'route',
  initial: 'Screen1',
  states: {
    Screen1: {
      on: {NEXT: 'Screen2'},
    },
    Screen2: {
      on: {NEXT: 'Screen3', PREV: 'Screen1'},
    },
    Screen3: {
      on: {NEXT: 'Screen35', PREV: 'Screen2'},
    },
    Screen35: {
      on: {NEXT: 'Screen1', PREV: 'Screen3'},
    },
  },
});
const service = interpret(routeMachine);
service.start();
service.onTransition(state => {
  console.log(`Transitioning to ${service.state.value.toString()}`);
  navigate(service.state.value.toString(), '');
});

export const FirstJourney = () => {
  // const [current, send, machine] = useMachine(routeMachine);

  //const {navigate} = useNavigation();
  const next = () => {
    service.send('NEXT');
  };

  // Back handler
  // -------------------------------------------------------------------------------
  useFocusEffect(() => {
    const onBackPress = () => {
      service.send('PREV');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });

  return (
    <Stack.Navigator initialRouteName={service.initialState.value}>
      <Stack.Screen
        name={'Screen1'}
        component={FirstScreen}
        initialParams={{next}}
      />
      <Stack.Screen
        name={'Screen2'}
        component={SecondScreen}
        initialParams={{next}}
      />
      <Stack.Screen
        name={'Screen3'}
        component={ThirdScreen}
        initialParams={{next}}
      />
      <Stack.Screen
        name={'Screen35'}
        component={ThirdScreen}
        initialParams={{next}}
      />
      <Stack.Screen
        name={'Screen4'}
        component={ForthScreen}
        initialParams={{next}}
      />
    </Stack.Navigator>
  );
};
