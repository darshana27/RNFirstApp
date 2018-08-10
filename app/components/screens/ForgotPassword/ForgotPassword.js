import React, { Component } from 'react';
import { KeyboardAvoidingView, AppRegistry, Text, TextInput, View,ScrollView, TouchableOpacity, Alert,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import styles from './styles';
import Header from '../../header/header';
let validators=require('../../../utils/validators').validators();
export default class Homescreen extends Component{
    constructor(props){
        super(props);
        this.state={currPwd:'',
                    nPwd:'',
                    cPwd:'',
                    access_token:''};
        this._forgotPassword=this._forgotPassword.bind(this);
    }
    async componentDidMount(){
        var data=await AsyncStorage.getItem('user_data')
        var pdata=JSON.parse(data)
        console.log(pdata.access_token)
        this.setState({access_token:pdata.access_token})
        console.log(this.state.access_token)
    }

    _forgotPassword(){
    // var data=await AsyncStorage.getItem('user_data')
    // console.log(JSON.parse(data))
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
        console.log(formData);
        debugger
        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/change',{ 
            method:'POST',
            headers:{
                'access_token':this.state.access_token    
            },
            body:formData })
            .then(response => response.json())
            .then(response =>{console.log(response)
            
            if(response.status==200){
                Alert.alert(response.user_msg)
            }
            else{
                Alert.alert(response.user_msg)
            } 
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