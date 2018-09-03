import React from 'react';
import { Text, View,Image, ScrollView,AsyncStorage,TouchableOpacity,Alert} from 'react-native';
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
// import {Loader} from '../../Loader/Loader';

export default class productListing extends React.Component {
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
    this.onPressDelete=this.onPressDelete.bind(this)
    this.orderNow=this.orderNow.bind(this)
  }

  componentDidMount(){
    console.log("ComponentDidMount")
    const category_id = this.props.navigation.getParam('category_id');
    console.log("category_id", category_id)
    category_id!==null?
    fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
    :console.log("Null")
  }
  
  callbackFn(response){
    console.log(response)
    console.log("TOTAL : "+response.total)
    console.log("Callback called")
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
    console.log(address)
      address.then(value=>{var x=JSON.parse(value); 
        console.log(x)
        if(x!=null){
          console.log(x.length)
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

  onPressDelete(rowData,rowMap){
    console.log(rowMap[rowData])
    // console.log(rowData.item.product_id)
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
    [{text:'Cancel'},
     {text:'Delete',onPress:()=> {

      console.log(rowData,rowMap)
      // console.log(rowData.item.product_id)
      var formData=new FormData()
      formData.append('product_id',rowData)
      fetchApi.fetchData(''+urls.host_url+urls.delete_cart,'POST',{},formData,(response => {
        if(response.status==200){
          serviceProvider.setData('total_carts',response.count)
          console.log('Delete Response')
          console.log(response)
          fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
          rowMap[rowData].closeRow()
          console.log("Success")
        }
        else{
          console.log("Unsuccessful")
        }
      }))
     }}],{cancelable: true}
  )
    // rowMap[rowData].closeRow()
    console.log("Deleting Item")
    console.log(this.state.dataSource)
  }

  callback(response){
    console.log(response)
    if(response.status==200){
      serviceProvider.setData('total_carts',response.count)
      console.log("Success")
    }
    else{
      console.log("Unsuccessful")
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
    console.log("Selected Value : "+selectedValue);
    console.log("Product ID : "+product_id)
    console.log(this.state.dataSource)
    var arr=this.state.dataSource
    var idx=arr.findIndex(item=>item.id==product_id)
    console.log(idx)
    var pid=arr[idx].product.id
    var formData=new FormData();
    formData.append("product_id",pid)
    formData.append("quantity",selectedValue)
    fetchApi.fetchData(''+urls.host_url+urls.edit_cart,'POST',{},formData,(response)=>{
      if(response.status==200){
        console.log(arr[idx])
        fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callback)
        console.log("Success")
      }
      else{
        console.log("Unsuccessful")
      }
    })  
  }

  render() {
    const { navigation } = this.props;
    const screen = navigation.getParam('screen');
    console.log(screen)
    console.log(this.state.isLoading)

    var dropdownValue=1
    var count=0
    var total_price=0
    // for (x in this.state.dataSource){     
    //   count=count+1
    //   console.log("here :" + this.state.dataSource[x].product.cost * this.state.qty)
    //   total_price+=(this.state.dataSource[x].product.cost * this.state.qty);
    //   console.log(total_price)
    // }
    // console.log(count) 
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
        {this.state.isLoading?<Loader/>:
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
                                         dropdownTextStyle={{fontSize:15}} 
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