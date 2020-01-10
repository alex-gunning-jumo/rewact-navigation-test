import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export const FirstScreen = () => {
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
      <Text style={{color: 'white'}}>Screen 1</Text>
      <Button
        title="Go"
        onPress={() => navigation.navigate('Screen2')}></Button>
    </View>
  );
};
