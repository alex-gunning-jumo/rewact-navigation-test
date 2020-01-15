import React from 'react';
import {View, Text, Button} from 'react-native';

export const ErrorScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        color: 'white',
      }}>
      <Text style={{color: 'white'}}>Error</Text>
    </View>
  );
};
