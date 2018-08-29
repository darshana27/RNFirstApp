import React from 'react';
import styles from '../AddressListing/styles';
import { Text, View,FlatList, ScrollView,Alert,TouchableOpacity,AsyncStorage,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../header/header';
import * as Colors from '../../../utils/colors';
import * as urls from '../../../lib/urls';

import {serviceProvider,user_data} from '../../../lib/serviceProvider';



let fetchApi=require('../../../lib/api').fetchApi();

export default class AddressListing extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            radioBG:Colors.white,
            selected:0,
        };
        this.fetchAddress=this.fetchAddress.bind(this)
        this.deleteAdd=this.deleteAdd.bind(this)
        this.onRadioSelected=this.onRadioSelected.bind(this) 
          
    }

    async componentDidMount(){
        var val=await AsyncStorage.getItem('complete_address')
        console.log(val)
        if(val!=null){
            this.setState({data:JSON.parse(val)})
        }
        if(val==null){
            this.setState({data:null})
        }
        console.log(this.state.data)
    }
    deleteAdd(idx){
        var arr=this.state.data
        arr.splice(idx,1)
        this.setState({data:arr})
        AsyncStorage.removeItem('complete_address')
        AsyncStorage.setItem('complete_address',JSON.stringify(this.state.data))
    }
    fetchAddress(){
        return this.state.data.map((element,idx)=>{
        console.log(element)
        return(
            <TouchableOpacity style={styles.itemRow} onPress={()=>{
                console.log(idx,this.state.selected)
                this.setState({selected:idx})
                console.log(this.state.selected)}}>
                <View style={styles.radioView}>
                    <TouchableOpacity style={[styles.radioButton,{backgroundColor:this.state.selected==idx?'#8E8E8E':'#fff'}]}>
                    </TouchableOpacity>
                </View>
                <View style={styles.addressView}>
                    <View style={styles.closeView}><TouchableOpacity onPress={()=>this.deleteAdd(idx)}><MaterialIcon name='close' size={14} color='#333333'/></TouchableOpacity></View>
                    <Text style={styles.userName}>{user_data.user_details.data.user_data.first_name+' '+user_data.user_details.data.user_data.last_name}</Text>
                    <Text style={styles.addressText}>{element.address +','+element.city +','+element.landmark+','+element.state+','+element.zipcode+','+element.country}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    }
    onRadioSelected(idx){
        console.log("Radio functions")
        this.setState({radioBG:Colors.addressListRadioInner})
    }        
    orderNow(idx){
        console.log("Order Now Index : "+idx)
        var full_address=this.state.data[idx]
        var address=''+full_address.address+', '+full_address.city+', '+full_address.landmark+', '+full_address.state+', '+full_address.zipcode+', '+full_address.country
        console.log(address)
        let formData=new FormData();
        formData.append('address',address)
        fetchApi.fetchData(''+urls.host_url+urls.order,'POST',{},formData,this.callbackFn)
    }
    callbackFn(response){
        console.log(response)
        if(response.status==200){
            Alert.alert('Order Placed Successfully')
        }
        else{
            Alert.alert('Something went wrong. Try again later.')
        }
    }
    render(){
            return(
            <View style={styles.mainView}>
                <Header 
                    styles={styles.header} 
                    title={'Address Listing'}
                    isSearch={false}
                    isAdd={true}
                    back={() => {this.props.navigation.goBack()}}
                    search={() => {this.props.navigation.navigate('AddAddress')}}/>
                    
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
                        <Text style={styles.btnText}>ORDER NOW</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}