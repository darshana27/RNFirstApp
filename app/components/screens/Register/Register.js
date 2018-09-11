import React, { Component } from 'react';
import {KeyboardAvoidingView,ImageBackground, ScrollView, Text, TextInput, View, TouchableOpacity,Alert,Platform} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { CheckBox } from 'react-native-elements';
import styles from './styles';
import Header from '../../header/header';
import Icon from '../../../utils/icon'
import { Toast } from 'native-base';
import * as urls from '../../../lib/urls';
let fetchApi=require('../../../lib/api').fetchApi();
let validators=require('../../../utils/validators').validators();

export default class Register extends Component{
    
    constructor(props){
        super(props);
        this.state={
            checked:false,
            fname:'',
            lname:'',
            email:'',
            pwd:'',
            cnfPwd:'',
            phone:'',

        }
        this._register = this._register.bind(this);
        this.callbackFn = this.callbackFn.bind(this);
    }

    componentDidMount(){
        
    }
    getInitialState(){
        return {
          value: 0,
        }
      }
    _register(){
        let ValidationChk = '';

        if(!validators.RegexNames(this.state.fname)){
            ValidationChk +=  ' -First Name ';
        } 
        if(!validators.RegexNames(this.state.lname)){
            ValidationChk +=  '-Last Name ';
        }
        if(!validators.RegexEmail(this.state.email)){
            ValidationChk +=  '-Email ';
        }
        if(!validators.RegexPassword(this.state.pwd)){
            ValidationChk +=  '-Password ';
        }
        if(this.state.pwd !== this.state.cnfPwd){
            ValidationChk +=  'Confirm Password ';
        }
        if(!validators.RegularExpressionMobileNumber(this.state.phone)){
            ValidationChk +=  '-Phone Number ';
        }
        if(ValidationChk !== ''){
            Alert.alert('PLease fill valid ' + ValidationChk)
        }
        else{

            if(this.state.checked===false){
                Alert.alert('Please agree the terms and conditions');
            }
            else{
            
                var formData = new FormData();
                formData.append("first_name",this.state.fname);
                formData.append("last_name", this.state.lname);
                formData.append("email", this.state.email);
                formData.append("password", this.state.pwd);
                formData.append("confirm_password", this.state.cnfPwd);
                formData.append("gender", this.state.value==1?'F':'M');
                formData.append("phone_no", this.state.phone);
                fetchApi.fetchData(''+urls.host_url+urls.user_register,'POST',null,formData,this.callbackFn)

            }            
        }
    }

    callbackFn(response){

        if( response.status != 200){
            Toast.show({
                text:response.user_msg,
                buttonText: "Okay",
                duration: 10000,
                position:'bottom',
                type:'danger'
            })
        }
        else{
            Toast.show({
                text: "Registration Successful!",
                buttonText: "Okay",
                duration: 10000,
                position:'bottom',
                
            })
        }
    }
    render(){
        var radio_props = [
            {label: 'Male  ', value: 0 },
            {label: 'Female', value: 1 }
          ];

         return (
            <ImageBackground source={require('../../../assets/images/Android_Master_bg.jpg')} style={styles.backgroundImage}>

            <View style={{flex:1}}>
                <View> 
                    <Header styles={styles.header} title={'Register'}
                            back={() => {this.props.navigation.goBack()}} />
                </View>
                <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                <View  style={styles.viewStyle}>
                    <Text style={styles.headingText}>NeoSTORE</Text>
                        <View style={styles.nestedView}>

                            <Icon style={styles.iconStyle} name="user" size={18} color="#FFFFFF"/>

                            <TextInput
                                placeholder="First Name"
                                multiline={false}
                                style={styles.inputBox}
                                underlineColorAndroid="transparent"
                                placeholderTextColor='#FFFFFF'
                                onChangeText={(fname) => this.setState({fname})}
                            />
                            
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="user" size={18} color="#FFFFFF"/>
                            <TextInput
                                style={styles.inputBox}
                                placeholder="Last Name"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="next"
                                ref={(lastName) => {this.Lname= lastName}}
                                onSubmitEditing={() => {this.Email.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                onChangeText={(lname) => this.setState({lname})}
                            />
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="message" size={18} color="#FFFFFF"/>
                            <TextInput
                                ref={(emailID) => {this.Email= emailID}}
                                style={styles.inputBox}
                                placeholder="Email"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="next"
                                onSubmitEditing={() => {this.Password.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({email})}
                            />
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="lock" size={18} color="#FFFFFF"/>
                            <TextInput
                                ref={(password) => {this.Password= password}}
                                style={styles.inputBox}
                                placeholder="Password"
                                placeholderTextColor='#FFFFFF'
                                secureTextEntry={true}
                                returnKeyType="next"
                                onSubmitEditing={() => {this.Cpassword.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                onChangeText={(pwd) => this.setState({pwd})}
                            />
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="lock" size={18} color="#FFFFFF"/>
                            <TextInput
                                ref={(cpassword) => {this.Cpassword= cpassword}}
                                style={styles.inputBox}
                                placeholder="Confirm Password"
                                placeholderTextColor='#FFFFFF'
                                secureTextEntry={true}
                                returnKeyType="next"
                                onSubmitEditing={() => {this.Phone.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                onChangeText={(cnfPwd) => this.setState({cnfPwd})}
                            />
                        </View>

                        <View style={styles.viewRadio}>
                            <Text style={styles.text}>Gender :</Text>
                            <RadioForm
                                ref={(radio) => {this.Radio=radio}}
                                style={{height:10}}
                                formHorizontal={true}
                                labelHorizontal={true}
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={11}
                                selectedButtonColor={'#ffffff'}
                                buttonInnerColor={'#ffffff'}
                                buttonOuterColor={'#ffffff'}
                                buttonColor={'#ffffff'}
                                labelStyle={{fontSize: 15, color: '#fff'}}
                                buttonWrapStyle={{marginLeft: 10}}
                                returnKeyType="next"
                                onPress={(value) => {this.setState({value:value});}}/>
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="mobile" size={21} color="#FFFFFF"/>
                            <TextInput
                                ref={(phoneNo) => {this.Phone= phoneNo}}
                                style={styles.inputBox}
                                placeholder="Phone Number"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="done"
                                underlineColorAndroid='transparent'
                                onChangeText={(phone) => this.setState({phone})}
                            />
                        </View>

                        <View style={styles.viewCheck}>  
                            <CheckBox
                                containerStyle={styles.checkBox}
                                textStyle={styles.textStyle}
                                center
                                title='I agree the Terms & Conditions'
                                // checkedIcon='stop'
                                checked={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.checked })}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={this._register}>
                            <Text style={styles.btnText}>Register</Text>
                        </TouchableOpacity>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </View> 
            </ImageBackground>
            
            )
        }
}
