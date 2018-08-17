import React from 'react';
import { Text, View,Image, ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../header/header';
import styles from '../MyCart/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Modal from "react-native-modal";
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
// import {Loader} from '../../Loader/Loader';

export default class productListing extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      product_category_id:0,
      selected:undefined,
      isModal1Visible:false,
    }
    this.callbackFn=this.callbackFn.bind(this);
    this._toggleModal1 = this._toggleModal1.bind(this);
  }

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
  _toggleModal1(){
    console.log("function called")
    this.setState({ isModal1Visible: !this.state.isModal1Visible });
  }
  onPressDelete=()=>{

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
        <Modal isVisible={this.state.isModal1Visible}
         onBackdropPress={() => this.setState({ isModal1Visible: false })}>
          <View style={styles.ModalView}>
            <Text style={styles.modalRatingText}>Delete this item from cart?</Text>
            <View style={styles.ModalBtns}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={this.rateNow}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={this.rateNow}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
        <ScrollView>
        <SwipeListView
                useFlatList
                data={this.state.dataSource}
                disableRightSwipe
                closeOnRowPress
                keyExtractor={({item,index}) => ''+index}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem = { ({item,index}) => 

                <View key={index}>
                    <View style={styles.itemContainer}>
                      <View style={styles.productImage}>
                          <Image 
                              style={styles.img}
                              source={{uri:item.product.product_images}}/>
                      </View>
                      <View style={styles.productDetails}>
                          <Text style={styles.item}>{item.product.name}</Text>
                          <Text style={styles.producer}>{'('+item.product.product_category+')'}</Text>
                          <View style={styles.dropdownContainer}>
                          <ModalDropdown style={styles.modalDropdown}
                                         defaultValue="Qty"
                                         dropdownStyle={{width:46,left:0}}   
                                         options={['1','2','3','4','5','6','7','8']}/>
                          <FeatherIcon name="chevron-down" size={15}/>
                           </View>
                      </View>
                      <View style={styles.ratingsView}>
                        <Text style={styles.price}>Rs.{item.product.cost}</Text>
                      </View>            
                     </View>
                     </View>
                   
                     }
                     renderHiddenItem={()=>
                      <View style={styles.backRow}>
                          <TouchableOpacity 
                              onPress={this._toggleModal1}
                              style={styles.deleteContainer}>
                              <FeatherIcon name="trash" size={25} color="#FFFFFF"/>
                          </TouchableOpacity>
                      </View>}
                      // leftOpenValue={-75}
                      rightOpenValue={-75}
                  >
            </SwipeListView>
            <View style={{height:80,flexDirection:'row',width:Dimensions.get('window').width}}>
                      <View><Text>TOTAL</Text></View>
                      <View ><Text>Rs. </Text></View>
            </View>
            </ScrollView>
        </View>
      </View>
    );
  }
}