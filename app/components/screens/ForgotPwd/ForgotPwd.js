import React, { Component } from 'react';
import { KeyboardAvoidingView, ImageBackground, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Icon from '../../../utils/icon'
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
let validators=require('../../../utils/validators').validators();
import Header from '../../header/header';
import styles from './styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import { Toast } from 'native-base'


export default class ForgotPwd extends Component{
    constructor(props){
        super(props);
        this.state={email:'',pwd:'',toggle:false};
        this._onPress = this._onPress.bind(this);
        this._onRegister = this._onRegister.bind(this);
    }

    _onRegister(){
        this.props.navigation.navigate('Register');
    }

    _onPress() {
        
        if(this.state.email===null || this.state.email===""){
            alert("Email cannot be empty")
        }
        else if(!validators.RegexEmail(this.state.email)){
            alert('Fill valid username or password')
        }
        else{
            let formData=new FormData();
                formData.append("email",this.state.email);
                console.log(formData);
                fetchApi.fetchData(''+urls.host_url+urls.user_forgot_password,'POST',null,formData,this.callbackFn)
        }
    }
    callbackFn(response){
        console.log(response);
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
        return (
            <ImageBackground source={require('../../../assets/images/Android_Master_bg.jpg')} style={styles.backgroundImage}>
             <KeyboardAvoidingView style={styles.viewStyle} behavior={'padding'}>
            <View> 
                    <Header styles={styles.header} title={'Forgot Password'}
                            back={() => {this.props.navigation.goBack()}} />
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.headingText}>NeoSTORE</Text>
                <View style={styles.nestedView}>
                    <Icon style={styles.iconStyle} name="user" size={22} color="#FFFFFF"/>
                    <TextInput
                        ref="Username"
                        style={styles.inputBox}
                        placeholder="Email"
                        placeholderTextColor='#FFFFFF'
                        underlineColorAndroid={'transparent'}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onChangeText={(email) => this.setState({email})}
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this._onPress}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
                

            </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                    <Text
                        style={styles.endText}>DON'T HAVE AN ACCOUNT?
                    </Text>
                    <View style={styles.plusView}>
                        <FeatherIcon onPress={this._onRegister} style={styles.addIcon} name="plus" size={30}/>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}



