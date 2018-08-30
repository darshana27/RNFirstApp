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
        }
        this._edit=this._edit.bind(this);
        this._reset=this._reset.bind(this);
      
    }
    getInitialState(){
        return {
          value: 0,
        }
      }
      componentDidMount(){
          console.log(user_data)
        //   console.log(user_data.user_data)
       this.NavigationListener=this.props.navigation.addListener('willFocus',()=>{
           alert('willfocus')
            this.setState({rerender:this.state.rerender+1})
        });
        // user_data.user_data.profile_pic!=""? console.log(user_data.user_data.profile_pic):console.log("Null")
    }
    componentWillUnmount(){
        this.NavigationListener.remove()
    }
    _edit(){
    //   this.props.navigation.navigate('EditProfile',{'data':user_data.user_data})
    this.props.navigation.navigate('EditProfile')
    }
    _reset(){
        // this.props.navigation.navigate('ForgotPassword',{'data':user_data.user_data})
        this.props.navigation.navigate('ForgotPassword')
    }
    render(){
        console.log('render')
        console.log(user_data.user_data.first_name)
        console.log('Profile Pic it is '+user_data.user_data.profile_pic)

        var defaultPic=require('../../../assets/user_placeholder.png')
        var currPic={uri:user_data.user_data.profile_pic}
        var profile_pic_url = user_data.user_data.profile_pic!=null || user_data.user_data.profile_pic!=''?currPic:defaultPic;
        // console.log(profile_pic_url)
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
                                value={user_data.user_data.first_name}
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
                                value={user_data.user_data.last_name}
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
                                value={user_data.user_data.email}
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
                                value={user_data.user_data.phone_no}
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
                                value={user_data.user_data.dob}
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
