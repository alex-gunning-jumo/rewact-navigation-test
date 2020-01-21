/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {createStore, Action, AnyAction} from 'redux';

import {
  NavigationNativeContainer,
  useNavigation,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PermissionsAndroid} from 'react-native';
import {FirstJourney} from './features/journeys/journey1';
import {SecondJourney} from './features/journeys/journey2';
import {composeWithDevTools} from 'redux-devtools-extension';
import {navigationRef} from './services/NavigationService';

declare var global: {HermesInternal: null | {}};

interface bleh {
  [key: string]: object;
}

interface MyProps {
  navigation: StackNavigationProp<bleh, 'bleh'>;
}

const CHANGE_JOURNEY = 'CHANGE_JOURNEY';
export const changeJourneyAllowed = () => ({
  type: CHANGE_JOURNEY,
});
const initialState = {
  changeJourney: true,
};
const reducer = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case CHANGE_JOURNEY: {
      return {
        ...state,
        changeJourney: true,
      };
    }
    default:
      return state;
  }
};
export const Stack = createStackNavigator();
const store = createStore(reducer, undefined, composeWithDevTools());

const App = () => {
  return (
    <Provider store={store}>
      <NavigationNativeContainer ref={navigationRef}>
        <Stack.Navigator
          headerMode="none"
          //initialRouteName={'ProtectedJourney'}
        >
          <Stack.Screen component={FirstJourney} name={'Journey1'} />
          <Stack.Screen component={SecondJourney} name={'ProtectedJourney'} />
        </Stack.Navigator>
      </NavigationNativeContainer>
    </Provider>
  );
};

export default App;
