import React from 'react';
import { View,StyleSheet, Text } from 'react-native';
import Header from '../../header/header';

export default class MyCart extends React.Component {
  static navigationOptions = {
    drawerLabel:'My Cart',
  }
  render() {
    return (
      <View>
      <Header styles={styles.header}   
                  title="My Cart"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />
      <View style={styles.container}>
        <Text style={styles.text}>My Cart</Text>
      </View>
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