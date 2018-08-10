import React, { Component } from 'react';
import { KeyboardAvoidingView, ImageBackground, Text, TextInput, View, TouchableOpacity, Alert,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
let validators=require('../../../utils/validators').validators();
// import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={uname:'darshana27997@gmail.com',pwd:'Darshana27997',toggle:false};
        this._onPress = this._onPress.bind(this);
        this._onRegister = this._onRegister.bind(this);
    }

    componentWillMount(){

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
     _onPress(){
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
            fetch('http://staging.php-dev.in:8844/trainingapp/api/users/login', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(  response =>{console.log(response);
                
                if( response.status != 200){
                    Alert.alert(response.user_msg)
                }
                else{
                    AsyncStorage.setItem('user_access_token',JSON.stringify(response.data.access_token));
                    console.log("After Login : "+response.data.access_token)
                    fetch(`http://staging.php-dev.in:8844/trainingapp/api/users/getUserData`,{
                        method:'GET',
                        headers:{
                          'access_token':JSON.parse(value) 
                        }
                      })
                      .then(response => response.json())
                      .then(response => {console.log("Fetch after login: "+response)
                      if(response.status!=200){
                        AsyncStorage.removeItem('user_access_token')
                        this.props.navigation.replace('Login')
                        // AsyncStorage.setItem('screen','Login')
                      }
                      else{
                     
                        this.props.navigation.replace('Homescreen',{'data':response})
                        console.log(response.data.product_categories)
                     
                      } 
                    })

                    console.log("After Login : "+response.data.access_token)
                    this.props.navigation.replace('Homescreen');}}
                );
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
                    // style={[styles.loginButton, this.state.toggle && styles.altBtn]}
                    style={styles.loginButton}
                    onPress={this._onPress}>
                    {/* onPress={()=> this.setState({toggle: !this.state.toggle})} */}
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



