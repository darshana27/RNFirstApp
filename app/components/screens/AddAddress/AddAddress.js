import React from 'react';
import { Text, View,Dimensions, ScrollView,TouchableOpacity,AsyncStorage,TextInput,KeyboardAvoidingView,Platform} from 'react-native';
import { Toast } from 'native-base'
import Header from '../../header/header';
import styles from '../AddAddress/styles';
let validators=require('../../../utils/validators').validators();

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
        };
        this.addAddress=this.addAddress.bind(this); 
    }
    componentDidMount(){
        idx=this.props.navigation.getParam('addressIndex')
        console.log(idx)
        addressData=this.props.navigation.getParam('addressData')
        addressData!=null?
        this.setState({
            address:addressData.address,
            city:addressData.city,
            landmark:addressData.landmark,
            state:addressData.state,
            zipcode:addressData.zipcode,
            country:addressData.country
        }):
        null
    }
    addAddress(){
        console.log('AddressData',addressData)
        if(this.state.address=='' || this.state.city=='' || this.state.landmark=='' || this.state.state=='' || this.state.zipcode=='' || this.state.country=='' ){
            alert("All fields are mandatory")
        }
        else if(this.state.zipcode.length!=6){
           alert("Enter valid zipcode")
        }
        else if(!validators.RegexNames(this.state.state)){
           alert("Enter valid state name")
        }
        else if(!validators.RegexNames(this.state.country)){
            alert("Enter valid country name")
         }
        else{
            var list=[];
            var completeAddress={address:this.state.address,city:this.state.city,landmark:this.state.landmark,state:this.state.state,zipcode:this.state.zipcode,country:this.state.country}
            var address=AsyncStorage.getItem('complete_address')

            address.then((value) => {
                var x=JSON.parse(value);    
                if(x!=null){
                    if(x.length==0){
                        list.push(completeAddress)
                        console.log(list)
                        AsyncStorage.setItem('complete_address',JSON.stringify(list))
                    
                    }
                    else{
                        idx!=null ?
                        x.splice(idx,1):
                        x.push(completeAddress)
                        console.log(x)
                        AsyncStorage.setItem('complete_address',JSON.stringify(x))   
                    }
                }
                else{
                    x=[]
                    x.push(completeAddress)
                    AsyncStorage.setItem('complete_address',JSON.stringify(x))
                    
                }
            })
       
            Toast.show({
                text: "Address Added Successfully!",
                buttonText: "Okay",
                duration: 10000,
                position:'bottom',
            })
            this.props.navigation.navigate('MyCart')
        }
}

    render(){
        return(
        <View>
            <Header styles={styles.header} title={'Add Address'}
                    back={() => {this.props.navigation.goBack()}} />
             
                    <ScrollView style={styles.viewStyle}>
                    <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                    <View>
                        <Text style={styles.text}>ADDRESS</Text>

                            <TextInput
                                placeholder="ADDRESS"
                                style={styles.textArea}
                                underlineColorAndroid="transparent" 
                                multiline={true}
                                numberOfLines={4}
                                defaultValue={this.state.address}
                                onChangeText={(address) => this.setState({address})}/>

                            <Text style={styles.text}>LANDMARK</Text>

                            <TextInput 
                                placeholder="LANDMARK"
                                underlineColorAndroid="transparent"
                                style={styles.cityInput}
                                defaultValue={this.state.city}
                                onChangeText={(city) => this.setState({city})}/>

                            <View style={styles.rowView}>
                                
                                <View style={styles.colView}>
                                    <Text style={styles.text}>CITY</Text>
                                    <TextInput 
                                        placeholder="CITY"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        defaultValue={this.state.landmark}
                                        onChangeText={(landmark) => this.setState({landmark})}>
                                    </TextInput>

                                    <Text style={styles.text}>ZIP CODE</Text>
                                    <TextInput 
                                    keyboardType='numeric'
                                        placeholder="ZIP CODE"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        defaultValue={this.state.zipcode}
                                        onChangeText={(zipcode) => this.setState({zipcode})}></TextInput>
                                </View>
                                <View style={styles.colView}>
                                    <Text style={styles.text}>STATE</Text>
                                    <TextInput 
                                        placeholder="STATE"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        defaultValue={this.state.state}
                                        onChangeText={(state) => this.setState({state})}></TextInput>
                                    <Text style={styles.text}>COUNTRY</Text>
                                    <TextInput 
                                        placeholder="COUNTRY"
                                        underlineColorAndroid="transparent"
                                        style={styles.smallInput}
                                        defaultValue={this.state.country}
                                        onChangeText={(country) => this.setState({country})}></TextInput>
                                </View>

                            </View>
                            <TouchableOpacity
                                style={styles.btnAddAddress}
                                onPress={this.addAddress}>
                                <Text style={styles.btnText}>SAVE ADDRESS</Text>
                            </TouchableOpacity>
                    </View> 
                    </KeyboardAvoidingView>
                </ScrollView>
       
        </View>

        )
    }
}