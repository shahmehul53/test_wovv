import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const SecondScreen = ({navigation}) => {
  return (
    <View>
      <Text>Text</Text>
      <Button title="Go to second" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({});
