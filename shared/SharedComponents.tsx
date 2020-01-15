import React from 'react';
import {Text} from 'react-native';
import {Button, View} from 'react-native';

const Header = ({title, BackButton}) => (
  <View
    style={{
      justifyContent: 'space-between',
      backgroundColor: 'whitesmoke',
      flexDirection: 'row',
    }}>
    {/* <Button title={'BACK'} onPress={() => service.send('PREV')} /> */}
    <BackButton />
    <Text>{title}</Text>
  </View>
);

export const routerHeader = service => ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  return (
    <Header
      title={title}
      BackButton={
        previous
          ? () => <Button title={'BACK'} onPress={() => service.send('PREV')} />
          : () => <View />
      }
    />
  );
};
