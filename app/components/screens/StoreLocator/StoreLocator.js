import React from 'react';
import { View,FlatList, Text,ScrollView} from 'react-native';
import styles from '../StoreLocator/styles';
import Header from '../../header/header';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '../../../utils/colors';

export default class StoreLocator extends React.Component {
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#4f4f4f',
        height: 1,
        opacity:0.7
      }}
    />
  );
  render() {
    this.address=[{
      storeName:'NeoSOFT Technologies',
      add:'The Ruby,Senapati Bapat Marg,Dadar(W),Mumbai,India',
      latlng:{
        latitude:19.019360,
        longitude:72.842651
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'Sigma IT Park,Rabale,Mumbai,Maharashtra,India',
      latlng:{
        latitude:19.145220,
        longitude:73.011880
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'IT6,Rajiv Gandhi-Infotech Park,Hinjewadi,Pune,India',
      latlng:{
        latitude:18.642090,
        longitude:73.721220
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'124 Unique Industrial Estate,Prabhadevi,Mumbai,INDIA',
      latlng:{
        latitude:19.178540,
        longitude:72.951630
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'Sigma IT Park,Rabale,Mumbai,Maharashtra,India',
      latlng:{
        latitude:19.145220,
        longitude:73.011880
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'124 Unique Industrial Estate,Prabhadevi,Mumbai,INDIA',
      latlng:{
        latitude:19.178540,
        longitude:72.951630
      }
    },
  ]
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
              latitudeDelta: 0.1022,
              longitudeDelta: 0.900921,
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
        </View> 
        <View style={styles.addressView}>
          <ScrollView>
            <FlatList     
            data={this.address}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item,index) => ''+item.id}
            ListFooterComponent={this.renderFooter}
            renderItem = { ({item,index}) => 
                <View style={styles.itemContainer}>
                  <View style={styles.productImage}>  
                    <MaterialIcon name="pin-drop" size={25} color='#4f4f4f'></MaterialIcon>
                  </View>
                      <View style={styles.productDetails}>
                        <Text style={styles.item}>{item.storeName}</Text>
                        <Text style={styles.producer}>{item.add}</Text>
                      </View>          
                </View> 
        
              }>
              </FlatList>
              </ScrollView>
        </View>           
      </View>
    );
  }
}
