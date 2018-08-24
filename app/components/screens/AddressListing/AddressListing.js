import React from 'react';
import styles from '../AddressListing/styles';
import { Text, View,FlatList, ScrollView,Dimensions,TouchableOpacity,AsyncStorage,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../header/header';
import {serviceProvider,user_data} from '../../../lib/serviceProvider';



let fetchApi=require('../../../lib/api').fetchApi();

export default class AddressListing extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        this.fetchAddress=this.fetchAddress.bind(this)
        this.deleteAdd=this.deleteAdd.bind(this)
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
        console.log('Selected Index :'+idx)
        console.log("Delete Function")
        console.log('Before')
        console.log(this.state.data)
        var arr=this.state.data
        var filteredArr=arr.splice(idx,1)
        console.log('After')
        console.log(arr)
        this.setState({data:arr})
        AsyncStorage.removeItem('complete_address')
        AsyncStorage.setItem('complete_address',JSON.stringify(this.state.data))
    }
    fetchAddress(){

                 return this.state.data.map((element,idx)=>{
                    console.log(element)
                    return(
                        <View style={styles.itemRow}>
                            <View style={styles.radioView}>
                                <View style={styles.radioButton}>
                                </View>
                            </View>
                            <View style={styles.addressView}>
                                <View style={styles.closeView}><TouchableOpacity onPress={()=>this.deleteAdd(idx)}><MaterialIcon name='close' size={14} color='#333333'/></TouchableOpacity></View>
                                <Text style={styles.userName}>{user_data.user_details.data.user_data.first_name+' '+user_data.user_details.data.user_data.last_name}</Text>
                                <Text style={styles.addressText}>{element.address +','+element.city +','+element.landmark+','+element.state+','+element.zipcode+','+element.country}</Text>
                            </View>
                        </View>
                    )
                })
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
                    <TouchableOpacity style={styles.orderBtn}>
                        <Text style={styles.btnText}>ORDER NOW</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}