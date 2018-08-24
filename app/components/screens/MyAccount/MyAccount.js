import React, { Component } from 'react';
import {KeyboardAvoidingView,ImageBackground, ScrollView, Text, TextInput, View, TouchableOpacity,AsyncStorage,Platform,Image} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { CheckBox } from 'react-native-elements';
import styles from './styles';
import Header from '../../header/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {serviceProvider,user_data} from '../../../lib/serviceProvider';
let validators=require('../../../utils/validators').validators();

export default class MyAccount extends Component{
    
    constructor(props){
        super(props);
        this.state={
            checked:false,
            access_token:'',
            rerender:0,
            // userDet:this.props.navigation.state.params.data.data.user_data    
            userDet:user_data.user_details.data.user_data
        }
        this._edit=this._edit.bind(this);
        this._reset=this._reset.bind(this);
        this.refresh=this.refresh.bind(this);
      
    }
    getInitialState(){
        return {
          value: 0,
        }
      }
      async componentDidMount(){
        this.setState({rerender:0})
        this.state.userDet.profile_pic!=""? console.log(this.state.userDet.profile_pic):console.log("Null")
        // var data=await AsyncStorage.getItem('user_access_token')
        // var pdata=JSON.parse(data)
        // console.log(pdata.access_token)
        // this.setState(pdata)
    }

    _edit(){
    //   this.props.navigation.navigate('EditProfile',{'data':this.state.userDet})
    this.props.navigation.navigate('EditProfile')
    }
    refresh(){
        console.log(this.state.userDet)
    }
    _reset(){
        // this.props.navigation.navigate('ForgotPassword',{'data':this.state.userDet})
        this.props.navigation.navigate('ForgotPassword')
    }
    render(){
        console.log(user_data.user_details.data.user_data.profile_pic)
        var defaultPic=require('../../../assets/user_placeholder.png')
        var currPic={uri:this.state.userDet.profile_pic}
        var profile_pic_url = this.state.userDet.profile_pic!=null || this.state.userDet.profile_pic!=''?currPic:defaultPic;
        console.log(profile_pic_url)
        return (
            <ImageBackground source={require('../../../assets/images/Android_Master_bg.jpg')} style={styles.backgroundImage}>

            <View style={styles.viewStyle}>
                <View> 
                    <Header styles={styles.header} title={'My Account'}
                            back={() => {this.props.navigation.goBack()}} />
                </View>
                <KeyboardAvoidingView style={styles.viewStyle} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                <View  style={styles.viewStyle}>
                <Image 
                      style={styles.roundedImage}
                      source={profile_pic_url}/>
                      <View style={{marginTop:30}}>
                        <View style={styles.nestedView}>

                            <Icon style={styles.iconStyle} name="user" size={20} color="#FFFFFF"/>

                            <TextInput
                                placeholder="First Name"
                                multiline={false}
                                style={styles.inputBox}
                                underlineColorAndroid="transparent"
                                placeholderTextColor='#FFFFFF'
                                // onChangeText={(fname) => this.setState({fname})}
                                value={this.state.userDet.first_name}
                                editable={false}
                            />
                            
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="user" size={20} color="#FFFFFF"/>
                            <TextInput
                                style={styles.inputBox}
                                placeholder="Last Name"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="next"
                                ref={(lastName) => {this.Lname= lastName}}
                                onSubmitEditing={() => {this.Email.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                // onChangeText={(lname) => this.setState({lname})}
                                value={this.state.userDet.last_name}
                                editable={false}
                            />
                        </View>

                        <View style={styles.nestedView}>
                            <MaterialIcon style={styles.iconStyle} name="email" size={20} color="#FFFFFF"/>
                            <TextInput
                                ref={(emailID) => {this.Email= emailID}}
                                style={styles.inputBox}
                                placeholder="Email"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="next"
                                onSubmitEditing={() => {this.Password.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                // onChangeText={(email) => this.setState({email})}
                                value={this.state.userDet.email}
                                editable={false}
                            />
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="mobile" size={25} color="#FFFFFF"/>
                            <TextInput
                                ref={(phoneNo) => {this.Phone= phoneNo}}
                                style={styles.inputBox}
                                placeholder="Phone Number"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="done"
                                underlineColorAndroid='transparent'
                                // onChangeText={(phone) => this.setState({phone})}
                                value={this.state.userDet.phone_no}
                                editable={false}
                            />
                        </View>
                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="birthday-cake" size={18} color="#FFFFFF"/>
                            <TextInput
                                ref={(phoneNo) => {this.Phone= phoneNo}}
                                style={styles.inputBox}
                                placeholder="DOB"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="done"
                                underlineColorAndroid='transparent'
                                // onChangeText={(phone) => this.setState({phone})}
                                value={this.state.userDet.dob}
                                editable={false}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={this._edit}>
                            <Text style={styles.btnText}>EDIT PROFILE</Text>
                        </TouchableOpacity>


                        </View>

                </View>
                <TouchableOpacity
                            style={styles.resetPasswordBtn}
                            onPress={this._reset}>
                            <Text style={styles.resetPassword}>RESET PASSWORD</Text>
                        </TouchableOpacity>
                </ScrollView>
                </KeyboardAvoidingView>
            </View> 
            </ImageBackground>
            
            )
        }
}
