import React from 'react';
import { View,FlatList, Text,ScrollView,TouchableOpacity} from 'react-native';
import styles from '../StoreLocator/styles';
import Header from '../../header/header';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Icon from '../../../utils/icon';
import Polyline from '@mapbox/polyline';

// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '../../../utils/colors';

export default class StoreLocator extends React.Component {
  constructor(props){
    super(props);
    this.state={
      map:null,
      dest_lat:'',
      dest_long:'',

      latitude: '',
      longitude: '',
      error: null,
      concat: null,
      coords:[],
      x: 'false',
    }
   this.parseStr=this.parseStr.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );

   }

   async getDirections(startLoc, destinationLoc) {
    console.log('Start End Loc',''+startLoc,''+destinationLoc)
         try {
             let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyCPXhNSCfYL9hK-jU8vt7Nr44Cl0B8nANo`)
             console.log(resp)
             let respJson = await resp.json();
             console.log(respJson)
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             console.log('Points',points)
             let coords = points.map((point, index) => {
               
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             this.setState({coords: coords})
             this.setState({x: "true"})
             console.log(this.state.coords)
             return coords
         } catch(error) {
           console.log('masuk fungsi')
             this.setState({x: "error"})
             return error
         }
     }

  setDestination(lat,long){
    this.setState({dest_lat:lat,
                  dest_long:long})
  }
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#4f4f4f',
        height: 1,
        opacity:0.7
      }}
    />
  );

  fitPadding(marker){

    this.map.fitToCoordinates([marker],{
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: true});
  }

  parseStr(obj){
    console.log(obj)
    return `${obj.latitude},${obj.longitude}`
  } 
  
  render() {

    const origin = {latitude: this.state.latitude, longitude: this.state.longitude};
    const destination={latitude: this.state.dest_lat, longitude: this.state.dest_long}
    this.address=[{
      storeName:'NeoSOFT Technologies',
      add:'The Ruby,Senapati Bapat Marg,Dadar(W),Mumbai,India',
      latlng:{
        latitude:19.019360,
        longitude:72.842651,
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'Sigma IT Park,Rabale,Mumbai,Maharashtra,India',
      latlng:{
        latitude:19.145220,
        longitude:73.011880,
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'IT6,Rajiv Gandhi-Infotech Park,Hinjewadi,Pune,India',
      latlng:{
        latitude:18.642090,
        longitude:73.721220,
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'124 Unique Industrial Estate,Prabhadevi,Mumbai,INDIA',
      latlng:{
        latitude:19.178540,
        longitude:72.951630,
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'Sigma IT Park,Rabale,Mumbai,Maharashtra,India',
      latlng:{
        latitude:19.145220,
        longitude:73.011880,
      }
    },
    {
      storeName:'NeoSOFT Technologies',
      add:'124 Unique Industrial Estate,Prabhadevi,Mumbai,INDIA',
      latlng:{
        latitude:19.178540,
        longitude:72.951630,

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
          <MapView 
            ref={ref => { this.map = ref }}
            style={styles.map}
            loadingEnabled={true}
            loadingIndicatorColor='#000'
            // mapType='hybrid'
            maxZoomLevel={18}
            showsMyLocationButton={true}
              initialRegion={{
                latitude: 19.019360,
                longitude: 72.842651,
                latitudeDelta: 0.1022,
                longitudeDelta: 0.900921,
              }}
          >

                {!!this.state.latitude && !!this.state.longitude && 
                  <MapView.Marker
                    coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                    title={"Your Location"}
                    pinColor='lightblue'
                  />}
                 {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && 
                  <MapView.Polyline
                    coordinates={this.state.coords}
                    strokeWidth={4}
                    strokeColor="hotpink"/>
                  }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }

          {this.address.map(marker => (
            <Marker
             onPress={()=>{
              const origin = {latitude: this.state.latitude, longitude: this.state.longitude};
              const destination={latitude: this.state.dest_lat, longitude: this.state.dest_long}
               this.setDestination(marker.latlng.latitude,marker.latlng.longitude)
               this.getDirections(this.parseStr({latitude:this.state.latitude,longitude:this.state.longitude}),
               this.parseStr(marker.latlng))}}
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
                <TouchableOpacity onPress={()=>this.fitPadding(item.latlng)}
                 style={styles.itemContainer}>
                  <View style={styles.productImage}>  
                    <Icon name="location" size={23} color='#4f4f4f'></Icon>
                  </View>
                      <View style={styles.productDetails}>
                        <Text style={styles.item}>{item.storeName}</Text>
                        <Text style={styles.producer}>{item.add}</Text>
                      </View>          
                </TouchableOpacity> 
        
              }>
              </FlatList>
              </ScrollView>
        </View>           
      </View>
    );
  }
}
