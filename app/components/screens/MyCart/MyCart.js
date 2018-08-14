import React from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import Header from '../../header/header';
import styles from '../productListing/styles';
import StarRating from 'react-native-star-rating';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {Loader} from '../../Loader/Loader';

export default class productListing extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      product_category_id:0,
      selected:undefined,
     
    }
    this.callbackFn=this.callbackFn.bind(this);
    this.onValueChange=this.onValueChange.bind(this);
  }
  // componentWillMount(){
  //   setTimeout(() => {
  //     this.setState({
  //       isLoading:false
  //     })
  //   },
  //   1500)
  // }
  componentDidMount(){
    console.log("ComponentDidMount")
    const category_id = this.props.navigation.getParam('category_id');
    console.log("category_id", category_id)
    // this.setState({product_category_id:category_id})
    // console.log("sidebar_category", sidebar_category);
    // {category_id!==null?
    category_id!==null?
    fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
    :console.log("Null")
    // fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=`+category_id,
    //       {method:'GET'}
    //     )
    //     .then(response => response.json())
    //     .then(responseJson => {   
  }
  callbackFn(response){
    console.log(response)
    console.log("Callback called")
    this.setState({ 
      dataSource: response.data,
    }, function(){

    });
  }

  onValueChange(value) {
    console.log("OnValue change called")
    this.setState({
      selected: ''+value
    });
    console.log(this.state.selected)
  }
  // callbackFnSidebar(response){
  //   this.setState({   
  //     dataSource: responseJson.data,
  //   }, function(){

  //   });
  // }
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#222',
        height: 1,
        opacity:0.7
      }}
    />
  );
  
  render() {
    const { navigation } = this.props;
    const screen = navigation.getParam('screen');
    console.log(screen)
    console.log(this.state.isLoading)
    console.log(this.state.selected)

    return (
      <View>
        <View> 
          {this.props.navigation.getParam('category_id')==1?
          <Header styles={styles.header}   
                  title="Tables"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==2?
          <Header styles={styles.header}   
                  title="Chairs"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==3?
          <Header styles={styles.header}   
                  title="Sofas"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==4?
          <Header styles={styles.header}   
                  title="Cupboards"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==null?
          <Header styles={styles.header}   
                  title={screen}
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
        </View>
        <View style={styles.container}>
        <SwipeListView
                useFlatList
                data={this.state.dataSource}
                
                ItemSeparatorComponent={this.renderSeparator}
                renderItem = { ({item}) => 
                
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('productDetails',{product_id:item.id})}}>
                    <View style={styles.itemContainer}>
                      <View style={styles.productImage}>
                          <Image 
                              style={styles.img}
                              source={{uri:item.product.product_images}}/>
                      </View>
                      <View style={styles.productDetails}>
                          <Text style={styles.item}>{item.product.name}</Text>
                          <Text style={styles.producer}>{'('+item.product.product_category+')'}</Text>
                          <ModalDropdown options={['option 1', 'option 2']}/>
                      </View>
                      <View style={styles.ratingsView}>
                      <Text style={styles.price}>Rs.{item.product.cost}</Text>
                      </View>            
                     </View> 
                     </TouchableOpacity>
                     }
                     renderHiddenItem={(
                      <View style={styles.rowBack}>
                         
                          <Text>Right</Text>
                      </View>)}
                  >
            
            </SwipeListView>
        </View>
      </View>
    );
  }
}