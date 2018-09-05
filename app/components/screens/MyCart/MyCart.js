import React from 'react';
import { Text, View,Image, ScrollView,AsyncStorage,TouchableOpacity,Alert,Vibration, Dimensions} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../header/header';
import styles from '../MyCart/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import {serviceProvider,user_data} from '../../../lib/serviceProvider';
import Icon from '../../../utils/icon'
import Modal from "react-native-modal";
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import Loader from '../../Loader/Loader';
import { connect } from 'react-redux';
import {totalCart} from '../../../redux/actions/userAction';
// import {Loader} from '../../Loader/Loader';

class MyCart extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      product_category_id:0,
      qty:1,
      itemId:0,
      totalAmt:0,
      sub_total:0,
    }
    this.callbackFn=this.callbackFn.bind(this);
    this.orderNow=this.orderNow.bind(this)
  }

  componentDidMount(){
    console.log('From Redux',this.props)
    const category_id = this.props.navigation.getParam('category_id');
    category_id!==null?
    fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
    :null
  }
  
  callbackFn(response){
    
    if(response.status==200){
    this.setState({ 
      isLoading:false,
      dataSource: response.data,
      totalAmt: response.total
    }, function(){
    });}
    else{
      alert(response.message)
      this.setState({isLoading:false})
    }
  }

  orderNow(){
    
    var address=AsyncStorage.getItem('complete_address')
      address.then(value=>{var x=JSON.parse(value); 
        if(x!=null){
          if(x.length!=0){
            this.props.navigation.navigate('AddressListing')
          }
          if(x.length==0){
            this.props.navigation.navigate('AddAddress')
          }
        } 
        else{
          this.props.navigation.navigate('AddAddress')
        }
      }
    )
    }  

  onPressDelete=(rowData,rowMap)=>{
  
      Alert.alert(
        'Delete Confirmation',
        'Are you sure you want to delete this item?',
        [{text:'Cancel',onPress:()=>{Vibration.vibrate(300)}},
        {text:'Delete',onPress:()=> {
          var formData=new FormData()
          formData.append('product_id',rowData)
          fetchApi.fetchData(''+urls.host_url+urls.delete_cart,'POST',{},formData,(response => {
            Vibration.vibrate(300)
            if(response.status==200){
              this.props.totalCart(response.total_carts)
              fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
              rowMap[rowData].closeRow()
            }
          }))
        }}],{cancelable: true}
      )
    rowMap[rowData].closeRow()

  }

  callback(response){
    if(response.status==200){
      alert('Quantity edited successfully')
      
    }
  }




  renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#222',
        height: 1,
        opacity:0.7
      }}
    />
  );
  
  calcCost(selectedValue,product_id){
   
    var arr=this.state.dataSource
    var idx=arr.findIndex(item=>item.id==product_id)
    var pid=arr[idx].product.id
    var formData=new FormData();
    formData.append("product_id",pid)
    formData.append("quantity",selectedValue)
    fetchApi.fetchData(''+urls.host_url+urls.edit_cart,'POST',{},formData,(response)=>{
      this.setState({isLoading:true})
      if(response.status==200){
        fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
      }
    })  
  }

  render() {
    const { navigation } = this.props;
    const screen = navigation.getParam('screen');
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
        {this.state.isLoading?
          <Loader/>
        :
        this.state.dataSource==null?<View style={styles.noItemsView}><Text style={styles.noItemsText}>No items in your cart</Text></View>:
        <ScrollView>
        <SwipeListView
                useFlatList={true}
                data={this.state.dataSource}
                disableRightSwipe
          
                keyExtractor={(item,index) => ''+item.product_id}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem = { ({item,rowMap}) => 

                <View>
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
                          <ModalDropdown  
                                        style={styles.modalDropdown}
                                         defaultValue={''+item.quantity}
                                         dropdownStyle={{width:46,left:0}}  
                                         dropdownTextStyle={{fontSize:15,borderColor:'black',borderWidth:1}} 
                                         options={[1,2,3,4,5,6,7,8]}
                                         renderButtonText={(value)=>this.calcCost(value,item.id)}
                                      />
                          <FeatherIcon name="chevron-down" size={15}/>
                           </View>
                      </View>
                      <View style={styles.ratingsView}>
                        <Text style={styles.price}>Rs.{item.product.sub_total}</Text>
                      </View>            
                     </View>
                     </View>
                   
                     }
                     renderHiddenItem={(rowData,rowMap)=>
                      
                      <View style={styles.backRow}>
                          <TouchableOpacity 
                              onPress={()=>this.onPressDelete(rowData.item.product_id,rowMap)}
                              style={styles.deleteContainer}>
                              <Icon name="trash" size={23} color="#FFFFFF"/>
                          </TouchableOpacity>
                          
                      </View>}
                      // leftOpenValue={-75}
                      rightOpenValue={-75}   
                  >
            </SwipeListView>
            <View style={styles.totalView}>
                      <View style={styles.leftContent}><Text style={styles.textTotal}>TOTAL</Text></View>
                      <View style={styles.rightContent}><Text style={styles.textAmount}>₹{this.state.totalAmt}</Text></View>
            </View>
            <View style={styles.btnView}>
             <TouchableOpacity
                            style={styles.registerButton}
                            onPress={()=>this.orderNow()}>
                            <Text style={styles.btnText}>ORDER NOW</Text>
                        </TouchableOpacity>
            </View>
            </ScrollView>}
            
        </View>
      </View>
    );
  }
}
function mapStateToProps(state){
  return {
    details:state.user
  }
}

export default connect(mapStateToProps,{ totalCart })(MyCart)