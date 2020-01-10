import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FifthScreen} from '../screen5';
import {SixthScreen} from '../screen6';
import {SeventhScreen} from '../screen7';
import {EighthScreen} from '../screen8';
import {connect} from 'react-redux';
import {View} from 'react-native';

const Stack = createStackNavigator();

const ProtectedJourney = ({passthrough, children}) => {
  return passthrough ? children : <View />;
};

export const SecondJourneyComponent = ({passthrough}) => (
  <ProtectedJourney passthrough={passthrough}>
    <Stack.Navigator>
      <Stack.Screen name={'Screen5'} component={FifthScreen} />
      <Stack.Screen name={'Screen6'} component={SixthScreen} />
      <Stack.Screen name={'Screen7'} component={SeventhScreen} />
      <Stack.Screen name={'Screen8'} component={EighthScreen} />
    </Stack.Navigator>
  </ProtectedJourney>
);

const mapStateToProps = state => ({
  passthrough: state.changeJourney,
});
export const SecondJourney = connect(mapStateToProps)(SecondJourneyComponent);
