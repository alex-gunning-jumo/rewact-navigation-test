import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {changeJourneyAllowed} from '../App';
import {connect} from 'react-redux';

const ForthComponent = ({
  allowChangeJourney,
}: {
  allowChangeJourney: () => void;
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        color: 'white',
      }}>
      <Text style={{color: 'white'}}>Screen 4 x-state</Text>
      <Button
        title="Go"
        onPress={() => {
          allowChangeJourney();
          navigation.navigate('ProtectedJourney');
        }}></Button>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  allowChangeJourney: () => {
    dispatch(changeJourneyAllowed());
  },
});

export const ForthScreen = connect(
  undefined,
  mapDispatchToProps,
)(ForthComponent);
