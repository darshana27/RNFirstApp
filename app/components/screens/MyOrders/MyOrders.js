import React from 'react';
import { View,StyleSheet, Text } from 'react-native';
import Header from '../../header/header';
import styles from '../MyOrders/styles';

export default class MyOrders extends React.Component {
  static navigationOptions = {
    drawerLabel:'My Orders',
  }
  render() {
    return (
      <View style={styles.container}>
        <Header 
            styles={styles.header} 
            title={'My Orders'}
            isSearch={true}
            isAdd={false}
            back={() => {this.props.navigation.goBack()}}/>
      </View>
    );
  }
}
