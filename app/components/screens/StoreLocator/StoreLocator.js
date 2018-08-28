import React from 'react';
import { View,StyleSheet, Text,TouchableOpacity} from 'react-native';
import styles from '../StoreLocator/styles';
import Header from '../../header/header';
import {MapView,Marker} from 'react-native-maps';

import * as Colors from '../../../utils/colors';

export default class StoreLocator extends React.Component {
  static navigationOptions = {
    drawerLabel:'Store Locator',
  }

  render() {
    this.address=[{
      storeName:'Neostore',
      add:'4th Floor, The Ruby, 29, Senapati Bapat Marg, Dadar West, Mumbai - 400028',
      latlng:{
        latitude:19.019360,
        longitude:72.842651
      }
    },
    {
      storeName:'Neostore',
      add:'Unit No 501, Sigma IT Park, Plot No R-203,204, Midc TTC Industrial Area. Rabale, Navi Mumbai, Maharashtra 400701',
      latlong:{
        latitude:19.145220,
        longitude:73.011880
      }
    }
  ]
  console.log(this.address[0].latlong)
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
              latitude: 19.019360,
              longitude: 72.842651,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          {this.address.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.storeName}
              description={marker.add}
            />
          ))}
          </MapView>
          </View>
          <View style={styles.addressView}>

          </View>
          </View>            
      </View>
    );
  }
}
