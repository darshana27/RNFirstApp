import React from 'react';
import { Text, View,Image, ScrollView,KeyboardAvoidingView,TouchableOpacity,AsyncStorage,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../header/header';
import styles from '../AddAddress/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Modal from "react-native-modal";
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

export default class AddAddress extends React.Component {
    constructor(props){
        super(props);
        this.state={
            address:'',
            city:'',
            landmark:'',
            state:'',
            zipcode:'',
            country:'',
            // list:[]
        };
        this.addAddress=this.addAddress.bind(this); 
    }

    addAddress(){
                // console.log('add Address'+this.state.address,this.state.city,this.state.landmark,this.state.state,this.state.zipcode,this.state.country)
        if(this.state.address=='' || this.state.city=='' || this.state.landmark=='' || this.state.state=='' || this.state.zipcode=='' || this.state.country=='' ){
            alert("All fields are mandatory")
        }
        else{
        var list=[];
        var completeAddress={address:this.state.address,city:this.state.city,landmark:this.state.landmark,state:this.state.state,zipcode:this.state.zipcode,country:this.state.country}
        var address=AsyncStorage.getItem('complete_address')
        if(address==null || address==undefined){
            list.push(completeAddress)
            console.log(list)
            AsyncStorage.setItem('complete_address',JSON.stringify(list))
        }
        else{
            address.then((value) => {var x=JSON.parse(value);
                if(x.length==0){
                    list.push(completeAddress)
                    console.log(list)
                    AsyncStorage.setItem('complete_address',JSON.stringify(list))
                }
                else{
                    x.push(completeAddress)
                    console.log(x)
                    AsyncStorage.setItem('complete_address',JSON.stringify(x))
                }
            
            })
        }}
        // console.log('add Address'+this.state.address,this.state.city,this.state.landmark,this.state.state,this.state.zipcode,this.state.country)
        // if(this.state.address=='' || this.state.city=='' || this.state.landmark=='' || this.state.state=='' || this.state.zipcode=='' || this.state.country=='' ){
        //     alert("All fields are mandatory")
        // }
        // else{  
        //     var completeAddress={address:this.state.address,city:this.state.city,landmark:this.state.landmark,state:this.state.state,zipcode:this.state.zipcode,country:this.state.country}
        //     this.setState({list:[...this.state.list,completeAddress]})
        //     console.log(this.state.list)
        //     console.log(JSON.stringify(this.state.list))
        //     AsyncStorage.setItem('complete_address',JSON.stringify(this.state.list))
        //     console.log("Added")
        // }
    }

    render(){
        return(
   
        <View>
            <Header styles={styles.header} title={'Add Address'}
                    back={() => {this.props.navigation.goBack()}} />
             
                    <ScrollView>
                    <View style={styles.viewStyle}>
                        <Text style={styles.text}>ADDRESS</Text>

                            <TextInput
                                placeholder="ADDRESS"
                                style={styles.textArea}
                                underlineColorAndroid="transparent" 
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(address) => this.setState({address})}/>

                            <Text style={styles.text}>CITY</Text>

                            <TextInput 
                                placeholder="CITY"
                                underlineColorAndroid="transparent"
                                style={styles.cityInput}
                                onChangeText={(city) => this.setState({city})}/>

                            <View style={styles.rowView}>
                                
                                <View style={styles.colView}>
                                    <Text style={styles.text}>CITY</Text>
                                    <TextInput 
                                        placeholder="Landmark"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        onChangeText={(landmark) => this.setState({landmark})}></TextInput>
                                    <Text style={styles.text}>ZIP CODE</Text>
                                    <TextInput 
                                    keyboardType='numeric'
                                        placeholder="ZIP CODE"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        onChangeText={(zipcode) => this.setState({zipcode})}></TextInput>
                                </View>
                                <View style={styles.colView}>
                                    <Text style={styles.text}>STATE</Text>
                                    <TextInput 
                                        placeholder="STATE"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        onChangeText={(state) => this.setState({state})}></TextInput>
                                    <Text style={styles.text}>COUNTRY</Text>
                                    <TextInput 
                                        placeholder="COUNTRY"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        onChangeText={(country) => this.setState({country})}></TextInput>
                                </View>

                            </View>
                            <TouchableOpacity
                                style={styles.btnAddAddress}
                                onPress={this.addAddress}>
                                <Text style={styles.btnText}>SAVE ADDRESS</Text>
                            </TouchableOpacity>
                    </View> 
                </ScrollView>
       
        </View>

        )
    }
}