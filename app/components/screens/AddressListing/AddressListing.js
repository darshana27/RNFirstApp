import React from 'react';
import styles from '../AddressListing/styles';
import { Text, View,ScrollView,TouchableOpacity,AsyncStorage,Alert,Vibration,Platform } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../header/header';
import * as Colors from '../../../utils/colors';
import * as urls from '../../../lib/urls';
import { user_data } from '../../../lib/serviceProvider';
let fetchApi=require('../../../lib/api').fetchApi();
import stripe from 'tipsi-stripe';
import {Toast} from 'native-base';
import Modal from "react-native-modal";
import Loader from '../../Loader/Loader';
import { connect } from 'react-redux'
import {userAction} from '../../../redux/actions/userAction'

class AddressListing extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModal1Visible:false,
            isModal2Visible:false,
            data:[],
            selected:0,
            rerender:0,
            isloading:false,
            addressLoader:true,
        };
        this.fetchAddress=this.fetchAddress.bind(this)
        this.deleteAdd=this.deleteAdd.bind(this)
        this.editAdd=this.editAdd.bind(this)
    }

    componentDidMount(){
        console.log(this.props.details.user_data)
        this.NavigationListener=this.props.navigation.addListener('willFocus',()=>{
            console.log(this.state.rerender)
           this.setState({rerender:this.state.rerender+1})
           this.fetchItems()
        });
    }

    _toggleModal1=()=>{
        console.log("function called")
        this.setState({ isModal1Visible: !this.state.isModal1Visible });
    }

    _toggleModal2=()=>{
        console.log("function called")
        this.setState({ isModal2Visible: !this.state.isModal2Visible });
    }

    async fetchItems(){
        var val=await AsyncStorage.getItem('complete_address')
        console.log("VAl ",val)
        if(val!=null){
            this.setState({data:JSON.parse(val),addressLoader:false})
        }
        if(val==null){
            this.setState({data:null,addressLoader:false})
        }
        console.log("Address : ",this.state.data)
    }
    deleteAdd(idx){
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete this address?',
            [{text:'Cancel',onPress:()=>{Vibration.vibrate(300)}},
            {text:'Delete',onPress:()=> {
                var arr=this.state.data
                arr.splice(idx,1)
                if(arr.length==0){
                    this.setState({data:[]})
                    AsyncStorage.setItem('complete_address',JSON.stringify(this.state.data))
                    alert('No address. Add your address first');this.props.navigation.navigate('AddAddress')
                }
                else{
                this.setState({data:arr})
                AsyncStorage.removeItem('complete_address')
                AsyncStorage.setItem('complete_address',JSON.stringify(this.state.data))
                }
            }}],
            {cancelable:true})
    }
    
    editAdd(idx,element){
        this.props.navigation.navigate('AddAddress',{'addressData':element,'addressIndex':idx})
    }
    fetchAddress(){
            return this.state.data.map((element,idx)=>{
            console.log(element)
            return(
                <View style={styles.itemRow} >
                    <TouchableOpacity style={styles.radioView} onPress={()=>{
                    console.log(idx,this.state.selected)
                    this.setState({selected:idx})
                    console.log(this.state.selected)}}>
                        <TouchableOpacity style={[styles.radioButton,{backgroundColor:this.state.selected==idx?'#8E8E8E':'#fff'}]}>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={styles.addressView}>
                        <View style={styles.closeView}>
                            <TouchableOpacity onPress={()=>this.editAdd(idx,element)}><MaterialIcon style={styles.close} name='edit' size={19} color='#333333'/></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.deleteAdd(idx)}><MaterialIcon style={styles.close} name='close' size={19} color='#333333'/></TouchableOpacity>
                        </View>
                        <Text style={styles.userName}>{this.props.details.user_data.first_name+' '+this.props.details.user_data.last_name}</Text>
                        <Text style={styles.addressText}>{element.address +','+element.city +','+element.landmark+','+element.state+','+element.zipcode+','+element.country}</Text>
                    </View>
                </View>
            )
        })
    }

    orderNow(idx){

        full_address=this.state.data[idx]
        var address=''+full_address.address+', '+full_address.city+', '+full_address.landmark+', '+full_address.state+', '+full_address.zipcode+', '+full_address.country
        let formData=new FormData();
        formData.append('address',address)
        fetchApi.fetchData(''+urls.host_url+urls.order,'POST',{},formData, (r )=> this.callbackFn(r,idx, this))
//    this._toggleModal1()
   
    }
   async callbackFn(response,idx, _this){
        // let _this = this
        console.log(response)
        if(response.status==200){

            Toast.show({
                text: "Order Placed Successfully!",
                buttonText: "Okay",
                duration: 10000,
                position:'bottom',
              })

              stripe.setOptions({
                publishableKey: 'pk_test_w3b1DsOC95SwXsrSQUuUruNc',
                androidPayMode: 'test', // Android only
              })
            
              const options = {
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                  billingAddress: {
                    name: this.props.details.user_data.first_name+' '+this.props.details.user_data.last_name,
                    line1: full_address.address,
                    line2: full_address.landmark,
                    city: full_address.city,
                    state: full_address.state,
                    country: full_address.country,
                    postalCode: full_address.zipcode,
                  },
                },
              }

              const token = await stripe.paymentRequestWithCardForm(options)
                tokenId = token.tokenId;
                console.log('Token',tokenId);
                this.setState({isloading:true})
                //for ios
                //  fetchApi.fetchData('http://localhost:9000/charge','POST',{},tokenId,(response => {
                //for android
                paymentURL=Platform.OS=='ios'?urls.iosPayment:urls.androidPayment
                console.log(paymentURL)
                    // Platform.OS=='android'?fetchApi.fetchData(urls.AndroidCustomer,'POST',{},tokenId,(response => {console.log(response)})):{}
                    fetchApi.fetchData(paymentURL,'POST',{},tokenId,(response => {
                    console.log(response)
                    
                    if(response.status=='succeeded'){
                        this.setState({isloading:false})
                        console.log('Payment successful')
                        _this._toggleModal1()
                        
                    }
                    else{
                        this.setState({isloading:false})
                        console.log('Payment unsuccessful')
                        Alert.alert('Payment unsuccessful.Please try again later.')
                        _this._toggleModal2()
                    }
                })) 
            // })     
        }
        else{
            Toast.show({
                text: "Something went wrong. Try again.",
                buttonText: "Okay",
                duration: 10000,
                position:'bottom',
              })
        }
    }
    render(){
            return(
            <View style={styles.mainView}>

            {this.state.isloading?<Loader/>:null}
             <Modal isVisible={this.state.isModal1Visible}
                        onBackdropPress={() => this.setState({ isModal1Visible: false })}>
                <View style={styles.ModalView}>
                    <MaterialIcon name='check-circle' size={100} color='#FF4C33'/>
                    <Text style={styles.success}>Payment Successful!</Text>
                </View>

             </Modal>

             <Modal isVisible={this.state.isModal2Visible}
                        onBackdropPress={() => this.setState({ isModal1Visible: false })}>
                <View style={styles.ModalView}>
                    <MaterialIcon name='warning' size={100} color='#FF4C33'/>
                    <Text style={styles.success}>Payment unsuccessful</Text>
                    <Text>Try again after sometime.</Text>
                </View>

             </Modal>
                <Header 
                    styles={styles.header} 
                    title={'Address Listing'}
                    isSearch={false}
                    isAdd={true}
                    back={() => {this.props.navigation.goBack()}}
                    search={() => {this.props.navigation.navigate('AddAddress')}}/>
                    {this.state.addressLoader?<Loader/>:
                <ScrollView>
                    <View style={styles.shippingTitleView}>
                        <Text style={styles.shippingText}>Shipping Address</Text>
                    </View>
                    <View style={{top:20}}>
                      {this.fetchAddress()}
                    </View>
                    <View style={styles.btnView}>
                    <TouchableOpacity 
                        onPress={()=>this.orderNow(this.state.selected)}
                        style={styles.orderBtn}>
                        <Text style={styles.btnText}>PLACE ORDER</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>}
            </View>
        )
    }
}
function mapStateToProps(state){
    return {
      details:state.user
    }
  }

export default connect(mapStateToProps,{ userAction })(AddressListing)