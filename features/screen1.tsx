import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export const FirstScreen = ({route}) => {
  const navigation = useNavigation();
  const {next} = route.params;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        color: 'white',
      }}>
      <Text style={{color: 'white'}}>Screen 1</Text>
      <Button title="Go" onPress={next}></Button>
    </View>
  );
};
