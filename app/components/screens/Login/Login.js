import React, { Component } from 'react';
import { KeyboardAvoidingView, ImageBackground, Text, TextInput, View, TouchableOpacity, Alert,AsyncStorage,Dimensions } from 'react-native';
import Icon from '../../../utils/icon'
import { serviceProvider } from '../../../lib/serviceProvider';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
let validators=require('../../../utils/validators').validators();
import styles from './styles';
import * as urls from '../../../lib/urls';
let fetchApi=require('../../../lib/api').fetchApi();
import SplashScreen from 'react-native-splash-screen'
import Loader from '../../Loader/Loader';
import Modal from "react-native-modal";
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import {userAction} from '../../../redux/actions/userAction';


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
                uname:'deshpande.darshana@gmail.com',
                pwd:'darshana27997',
                isModal1Visible:false,
                toggle:false,
                isDisabled:false
        };
        this._onPress = this._onPress.bind(this);
        this._onRegister = this._onRegister.bind(this);
        this.callbackFn=this.callbackFn.bind(this);
        this.callbackFnFetch=this.callbackFnFetch.bind(this);
        this._toggleModal1 = this._toggleModal1.bind(this);
    }

    componentDidMount(){   
        SplashScreen.hide();
    }

    _onRegister(){
        this.props.navigation.navigate('Register');
    }

    _onPress(){
        this._toggleModal1()
        this.setState({isDisabled:true})
        if(this.state.uname===null || this.state.uname==="" && this.state.pwd===null || this.state.pwd===""){
            alert("Email and password cannot be empty")
        }
        else if(!validators.RegexEmail(this.state.uname) && !validators.RegexPassword(this.state.pwd)){
            alert('Fill valid username or password')
        }
        else{
            let formData=new FormData();
            formData.append("email", this.state.uname);
            formData.append("password", this.state.pwd);
            fetchApi.fetchData(''+urls.host_url+urls.user_login,'POST',null,formData,this.callbackFn)
        }
    } 

    callbackFn(response){
        if( response.status != 200){
            this._toggleModal1()
            Toast.show({
                text:response.user_msg,
                buttonText: "Okay",
                duration: 10000,
                position:'bottom',
                type:'danger'
            })
        }
        else{
            this._toggleModal1()
            serviceProvider.setUsrData['access_token',response.data.access_token]
            var accessToken=response.data.access_token
            AsyncStorage.setItem('user_access_token',accessToken);
            fetchApi.fetchData(''+urls.host_url+urls.user_fetch_details,'GET',{},null,this.callbackFnFetch)
        }   
    } 

    callbackFnFetch(response){
        if(response.status!=200){       
            AsyncStorage.removeItem('user_access_token')
            this.props.navigation.replace('Login')
        }
        else{

            this.props.userAction(response.data)
            this.props.navigation.replace('Homescreen',{
                'data':response
            }) 
        } 
    }  
        
    _toggleModal1(){
        this.setState({ isModal1Visible: !this.state.isModal1Visible });
    }

    render(){
        return (
            <ImageBackground source={require('../../../assets/images/Android_Master_bg.jpg')} style={styles.backgroundImage}>

                <Modal style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}} isVisible={this.state.isModal1Visible}>
                    <Loader/>
                </Modal>

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
                            onSubmitEditing={() => {this.Password.focus();} }
                            blurOnSubmit={false}
                            onChangeText={(uname) => this.setState({uname})}
                        />
                    </View>

                    <View style={styles.nestedView}>
                        <Icon style={styles.iconStyle} name="lock" size={22} color="#FFFFFF"/>
                        <TextInput
                            ref={(password) => {this.Password= password}}
                            style={styles.inputBox}
                            placeholder="Password"
                            placeholderTextColor='#FFFFFF'
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}
                            returnKeyType="done"
                            onChangeText={(pwd) => this.setState({pwd})}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this._onPress}>
                        <Text style={styles.btnText}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text 
                        style={styles.textLink} 
                        onPress={ ()=>  this.props.navigation.navigate('ForgotPwd')} >Forgot Password?
                    </Text>

                    <View style={styles.footer}>
                        <Text
                            style={styles.endText}>DON'T HAVE AN ACCOUNT?
                        </Text>
                        
                        <View style={styles.plusView}>
                            <MaterialIcon onPress={this._onRegister} style={styles.addIcon} name="add" size={30}/>
                        </View>
                    </View>

                </KeyboardAvoidingView>
   
            </ImageBackground>
        )
    }
}
function mapStateToProps(state){
    return {
      details:state.user
    }
  }

export default connect(mapStateToProps,{ userAction })(Login)



