import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export const SeventhScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        color: 'white',
      }}>
      <Text style={{color: 'white'}}>Protected Journey Screen 3</Text>
      <Button
        title="Go"
        onPress={() => navigation.navigate('Screen8')}></Button>
    </View>
  );
};
