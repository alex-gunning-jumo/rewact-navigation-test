import React, {useEffect, useLayoutEffect} from 'react';
import {useMachine} from '@xstate/react';
import {Machine, interpret, assign} from 'xstate';
import {FirstScreen} from '../screen1';
import {SecondScreen} from '../screen2';
import {ThirdScreen} from '../screen3';
import {createStackNavigator} from '@react-navigation/stack';
import {ForthScreen} from '../screen4';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {BackHandler, View, Text, Button} from 'react-native';
import {navigate, push, navigationRef} from '../../services/NavigationService';
import {routerHeader} from '../../shared/SharedComponents';
import {ErrorScreen} from '../errorScreen';

const Stack = createStackNavigator();
const routeMachine = Machine(
  {
    id: 'route',
    context: {isScreen: true}, // State-machine context for screens vs states not involving screens - for awaiting ASYNC_GUARD_STATE
    initial: 'Screen1',
    states: {
      Screen1: {
        on: {
          NEXT: [
            {
              target: 'ASYNC_GUARD_STATE', // Move to the ASYNC_GUARD_STATE and await the result of a promise.
              actions: [assign({isScreen: false})],
            },
          ],
        },
      },
      Screen2: {
        on: {
          NEXT: {
            target: 'Screen3',
            cond: 'NORMAL_STATE_CONDITION', // Guard - at the state-machine level
          },
          PREV: 'Screen1',
        },
      },
      Screen3: {
        on: {NEXT: 'Screen35', PREV: 'Screen2'},
      },
      Screen35: {
        on: {NEXT: 'Screen1', PREV: 'Screen3'},
      },
      ErrorScreen: {
        on: {PREV: 'Screen1'},
      },
      ASYNC_GUARD_STATE: {
        invoke: {
          id: 'examplePromise',
          src: (context, event) => () => Promise.resolve(), // Async Guard state - at the promise-level. Required to be an explicit state due to the natural mapping between promise-states and state-machines
          onDone: {
            target: 'Screen2',
            actions: [assign({isScreen: true})],
          },
          onError: {
            target: 'ErrorScreen',
            actions: [assign({isScreen: true})],
          },
        },
      },
    },
  },
  {
    guards: {
      NORMAL_STATE_CONDITION: (context, event) => {
        return true;
      },
    },
  },
);
const service = interpret(routeMachine);
service.start();
service.onTransition(state => {
  if (state.context.isScreen) {
    navigate(state.value.toString(), '');
  }
});

export const FirstJourney = () => {
  const next = () => {
    service.send('NEXT');
  };

  //  Hardware Back handler
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
        options={{
          header: routerHeader(service),
        }}
      />
      <Stack.Screen
        name={'Screen2'}
        component={SecondScreen}
        initialParams={{next}}
        options={{
          header: routerHeader(service),
        }}
      />
      <Stack.Screen
        name={'Screen3'}
        component={ThirdScreen}
        initialParams={{next}}
        options={{
          header: routerHeader(service),
        }}
      />
      <Stack.Screen
        name={'Screen35'}
        component={ThirdScreen}
        initialParams={{next}}
        options={{
          header: routerHeader(service),
        }}
      />
      <Stack.Screen
        name={'Screen4'}
        component={ForthScreen}
        initialParams={{next}}
        // options={{
        //   header: routerHeader,
        // }}
      />
      <Stack.Screen
        name={'ErrorScreen'}
        component={ErrorScreen}
        options={{
          header: routerHeader(service),
        }}
      />
    </Stack.Navigator>
  );
};
