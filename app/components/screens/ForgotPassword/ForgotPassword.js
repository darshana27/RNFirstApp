import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TextInput, View,ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from '../../../utils/icon'
import { Toast } from 'native-base'
import styles from './styles';
import Header from '../../header/header';
let validators=require('../../../utils/validators').validators();
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import { StackActions, NavigationActions } from 'react-navigation';


export default class Homescreen extends Component{
    constructor(props){
        super(props);
        this.state={currPwd:'',
                    nPwd:'',
                    cPwd:'',
                    access_token:'',
            };
        this._forgotPassword=this._forgotPassword.bind(this);
    }

    _forgotPassword(){

        let ValidationChk = '';
        // if(!validators.RegexPassword(this.state.currPwd)){
        //     ValidationChk += 'Current Password ';
        //     // Alert.alert('Email is invalid');
        // }
        if(!validators.RegexPassword(this.state.nPwd)){
            ValidationChk += 'New Password ';
            Alert.alert('New Password is invalid');
        }
        else if(this.state.currentPwd===this.state.nPwd){
            Alert.alert('Old and new Passwords cannot be same');
        }
        else if(this.state.nPwd!==this.state.cPwd){
            ValidationChk += 'Confirm Password'
            Alert.alert('Passwords do not match');
        }
        else if(ValidationChk!==''){
            Alert.alert('Please fill valid '+ValidationChk);
        }
        else{   
            let formData=new FormData();
            formData.append("old_password",this.state.currPwd);
            formData.append("password",this.state.nPwd);
            formData.append("confirm_password",this.state.cPwd);
            var access=this.props.navigation.getParam('data')
            fetchApi.fetchData(''+urls.host_url+urls.user_change_password,'POST',{},formData,(response)=>{
                console.log(response)   
                if(response.status==200){
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                      });
                      this.props.navigation.dispatch(resetAction);
                    Toast.show({
                        text: response.user_msg,
                        buttonText: "Okay",
                        duration: 10000,
                        position:'bottom',
                      })
                }
                else{
                    Toast.show({
                        text: response.user_msg,
                        buttonText: "Okay",
                        duration: 10000,
                        position:'bottom',
                      })
                }
            })
        }
    }


    callbackFn(response){
        console.log(response)   
            if(response.status==200){
                Toast.show({
                    text: response.user_msg,
                    buttonText: "Okay",
                    duration: 10000,
                    position:'bottom',
                  })

            }
            else{
                Toast.show({
                    text: response.user_msg,
                    buttonText: "Okay",
                    duration: 10000,
                    position:'bottom',
                  })
            } 
    }
    render(){
      
        return(
            <KeyboardAvoidingView style={styles.viewStyle} behavior={'padding'}>
            
                <View style={styles.viewStyle}>
                    <View> 
                        <Header styles={styles.header} title={'Reset Password'}
                                back={() => {this.props.navigation.goBack()}} />
                    </View>

                    <ScrollView>
                    <View  style={styles.viewStyle}>
                        <Text style={styles.headingText}>NeoSTORE</Text>
                            <View style={styles.nestedView}>

                                <Icon style={styles.iconStyle} name="lock" size={20} color="#FFFFFF"/>

                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Current Password"
                                    placeholderTextColor='#FFFFFF'
                                    returnKeyType="next"
                                    ref={(currentPassword) => {this.CurrentPwd= currentPassword}}
                                    onSubmitEditing={() => {this.nPwd.focus();} }
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(currPwd) => this.setState({currPwd})}
                                />
                                
                            </View>
                            <View style={styles.nestedView}>

                                <Icon style={styles.iconStyle} name="lock" size={20} color="#FFFFFF"/>

                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="New Password"
                                    placeholderTextColor='#FFFFFF'
                                    returnKeyType="next"
                                    ref={(newPassword) => {this.NewPwd= newPassword}}
                                    onSubmitEditing={() => {this.cPwd.focus();} }
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(nPwd) => this.setState({nPwd})}
                                />

                            </View>
                            <View style={styles.nestedView}>

                                <Icon style={styles.iconStyle} name="lock" size={20} color="#FFFFFF"/>

                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Confirm Password"
                                    placeholderTextColor='#FFFFFF'
                                    returnKeyType="next"
                                    ref={(conPassword) => {this.ConPwd= conPassword}}
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(cPwd) => this.setState({cPwd})}
                                />

                            </View>
                            <TouchableOpacity
                                style={styles.resetButton}
                                onPress={this._forgotPassword}>
                                <Text style={styles.btnText}>Reset</Text>
                            </TouchableOpacity>
                            </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        )
    }
}