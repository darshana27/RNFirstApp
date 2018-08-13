import React, { Component } from 'react';
import { KeyboardAvoidingView, ImageBackground, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
let validators=require('../../../utils/validators').validators();
// import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';

export default class ForgotPwd extends Component{
    constructor(props){
        super(props);
        this.state={email:'',pwd:'',toggle:false};
        this._onPress = this._onPress.bind(this);
        this._onRegister = this._onRegister.bind(this);
    }
    // componentDidMount(){
    //     return fetch('https://staging.php-dev.in:8844/trainingapp/api/users/login', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email: "Kannan.Maravar@wwindia.com",
    //             password: "KannanMaravar123"
    //         }),
    //     }).then((response)=>response.json())
    //     .then((responseJson => {console.log('fetch')}))
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }
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
                // fetch("http://staging.php-dev.in:8844/trainingapp/api/users/forgot",{ 
                //     method:'POST',
                //     body:formData })
                // .then(response => response.json())
                // .then(  response =>{console.log(response);
                //     if(response.status==200){
                //         Alert.alert(response.user_msg)
                //     }
                //     else{
                //         console.log(response.user_msg)
                //     } 
                // })
                }
   
    }
    callbackFn(response){
        console.log(response);
        if(response.status==200){
            Alert.alert(response.user_msg)
        }
        else{
            console.log(response.user_msg)
        } 
    }
    render(){
        return (
            <ImageBackground source={require('../../../assets/images/Android_Master_bg.jpg')} style={styles.backgroundImage}>

            <KeyboardAvoidingView style={styles.viewStyle} behavior={'padding'}>
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
                    // style={[styles.loginButton, this.state.toggle && styles.altBtn]}
                    style={styles.loginButton}
                    onPress={this._onPress}>
                    {/* onPress={()=> this.setState({toggle: !this.state.toggle})} */}
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
                
                <View style={styles.footer}>
                    <Text
                        style={styles.endText}>DON'T HAVE AN ACCOUNT?
                    </Text>
                    {/* <View style={styles.registerBtn}> */}
                    <View style={styles.plusView}>
                        <FeatherIcon onPress={this._onRegister} style={styles.addIcon} name="plus" size={30}/>
                    </View>
                    {/* </View> */}
                </View>
          
            </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}



