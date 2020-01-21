import React from 'react';
import {View, Text, Button} from 'react-native';

export const FirstScreen = ({route}) => {
  const {next} = route.params;
  // console.log(route.params);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        color: 'white',
      }}>
      <Text style={{color: 'white'}}>Screen 1 x-state</Text>
      <Button title="Go" onPress={next}></Button>
    </View>
  );
};
