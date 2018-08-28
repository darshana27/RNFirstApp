import React from 'react';
import { View,StyleSheet, Text,TouchableOpacity} from 'react-native';
import styles from '../StoreLocator/styles';
import Header from '../../header/header';
import MapView from 'react-native-maps';

import * as Colors from '../../../utils/colors';

export default class StoreLocator extends React.Component {
  static navigationOptions = {
    drawerLabel:'Store Locator',
  }
  render() {
    return (
      <View style={styles.container}>
        <Header 
                    styles={styles.header} 
                    title={'Store Locator'}
                    isSearch={true}
                    isAdd={false}
                    back={() => {this.props.navigation.goBack()}}
                    />
        <View style={styles.mainView}>
          <View style={styles.mapView}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          </View>
          </View>            
      </View>
    );
  }
}
