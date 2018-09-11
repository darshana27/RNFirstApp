import React from 'react';
import { Text, View,Image, ScrollView,AsyncStorage,TouchableOpacity,Alert,Vibration } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../header/header';
import styles from '../MyCart/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Icon from '../../../utils/icon'
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import Loader from '../../Loader/Loader';
import { connect } from 'react-redux';
import {totalCart} from '../../../redux/actions/userAction';
import { Toast } from 'native-base'

class MyCart extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      totalAmt:0,
    }
    this.callbackFn=this.callbackFn.bind(this);
    this.orderNow=this.orderNow.bind(this)
  }

  componentDidMount(){
    const category_id = this.props.navigation.getParam('category_id');
    category_id!==null?
    fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
    :null
  }
  
  callbackFn(response){
    console.log(response.data)
    if(response.status==200){
      this.setState({ 
        isLoading:false,
        dataSource: response.data,
        totalAmt: response.total,
      });
    }
    else{
      alert(response.message)
      this.setState({isLoading:false})
    }
  }

  orderNow(){
    
    var address=AsyncStorage.getItem('complete_address')
      address.then(value=>{
          var x=JSON.parse(value); 
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
          this.setState({isLoading:true})
          var formData=new FormData()
          formData.append('product_id',rowData)
          fetchApi.fetchData(''+urls.host_url+urls.delete_cart,'POST',{},formData,(response => {
            Vibration.vibrate(300)
           
            if(response.status==200){
              this.props.totalCart(response.total_carts)
              var idx=this.state.dataSource.findIndex(item=>item.product_id==rowData)
              console.log('This',this.state.dataSource,idx,this.state.dataSource.total,this.state.dataSource[idx].product.sub_total)
              this.state.totalAmt=this.state.totalAmt-this.state.dataSource[idx].product.sub_total
              this.state.dataSource.splice(idx,1)
              this.setState({isLoading:false})
              Toast.show({
                text: "Item Deleted successfully!",
                buttonText: "Okay",
                duration: 10000,
                position:'top',
           
              })
            }
          }))
        }}],{cancelable: true}
      )
    rowMap[rowData].closeRow()
  }

  callback(response){
    if(response.status==200){ 
      Toast.show({
        text: response.message,
        buttonText: "Okay",
        duration: 10000,
        position:'top',
      })
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

    this.setState({isLoading:true})
    var arr=this.state.dataSource
    var idx=arr.findIndex(item=>item.id==product_id)
    var pid=arr[idx].product.id
    var formData=new FormData();
    formData.append("product_id",pid)
    formData.append("quantity",selectedValue)
    fetchApi.fetchData(''+urls.host_url+urls.edit_cart,'POST',{},formData,(response)=>{
    if(response.status==200){
      console.log(this.state.dataSource)
      this.state.dataSource[idx].quantity=selectedValue
      this.state.totalAmt=this.state.totalAmt-this.state.dataSource[idx].product.sub_total
      this.state.dataSource[idx].product.sub_total=this.state.dataSource[idx].product.cost * selectedValue 
      this.state.totalAmt=this.state.totalAmt+this.state.dataSource[idx].product.sub_total
      this.setState({isLoading:false})
      Toast.show({
        text: "Quantity edited successfully!",
        buttonText: "Okay",
        duration: 10000,
        position:'top',
      })
      // fetchApi.fetchData(''+urls.host_url+urls.list_cart_items,'GET',{},null,this.callbackFn)
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
            this.state.dataSource==null || this.state.dataSource.length==0?<View style={styles.noItemsView}><Text style={styles.noItemsText}>No items in your cart</Text></View>:
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
                                              defaultValue={' '+item.quantity+' '}
                                              dropdownStyle={{width:46,left:0}}  
                                              dropdownTextStyle={{fontSize:15}} 
                                              options={['1','2','3','4','5','6','7','8']}
                                              renderButtonText={(value)=>this.calcCost(value,item.id)}
                                            >
                                  <View style={styles.ddstyle}>
                                    <Text style={{fontSize:15}}>{item.quantity+' '}</Text>
                                    <MaterialIcon name="keyboard-arrow-down" size={20}/>
                                  </View>
                                </ModalDropdown>
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