import React from 'react';
import { View,StyleSheet, Text } from 'react-native';

export default class MyCart extends React.Component {
  static navigationOptions = {
    drawerLabel:'My Cart',
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>My Cart</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
    }
  });