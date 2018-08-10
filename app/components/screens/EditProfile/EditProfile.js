import React, { Component } from 'react';
import {KeyboardAvoidingView,ImageBackground,Alert, ScrollView, Text, TextInput, View, TouchableOpacity,AsyncStorage,Platform,Image} from 'react-native';
import styles from './styles';
import Header from '../../header/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import DatePicker from 'react-native-datepicker'

let validators=require('../../../utils/validators').validators();

export default class EditProfile extends Component{
    
    constructor(props){
        super(props);
        this.state={
            checked:false,
            access_token:'',
            first_name:'',
            last_name:'',
            email:'',
            phone_no:'',
            dob:''
        };
        this._editDetails=this._editDetails.bind(this); 
    }
    getInitialState(){
        return {
          value: 0,
        }
      }
      async componentDidMount(){
        var data=await AsyncStorage.getItem('user_data')
        var pdata=JSON.parse(data)
        console.log("Edit Profile: "+pdata.access_token)
        this.setState({access_token:pdata.access_token})
    }
    _editDetails(){
        let formData=new FormData();
        formData.append("email",this.state.email);
        formData.append("dob",this.state.dob);
        formData.append("phone_no",this.state.phone_no);
        formData.append("profile_pic",btoa('../../../assets/user_placeholder.png'));
        console.log(formData)
        console.log("editDetails() :"+this.state.access_token);
        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/update',{
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

    render(){
         return (
            <ImageBackground source={require('../../../assets/images/Android_Master_bg.jpg')} style={styles.backgroundImage}>

            <View style={styles.viewStyle}>
                <View> 
                    <Header styles={styles.header} title={'Edit Profile'}
                            back={() => {this.props.navigation.goBack()}} />
                </View>
                <KeyboardAvoidingView style={styles.viewStyle} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                <View style={styles.viewStyle}>
                <Image 
                      style={styles.roundedImage}
                      source={require('../../../assets/user_placeholder.png')}/>
                      <View style={{marginTop:50}}>
                        <View style={styles.nestedView}>

                            <Icon style={styles.iconStyle} name="user" size={20} color="#FFFFFF"/>

                            <TextInput
                                placeholder="First Name"
                                multiline={false}
                                style={styles.inputBox}
                                underlineColorAndroid="transparent"
                                placeholderTextColor='#FFFFFF'
                                onChangeText={(first_name) => this.setState({first_name})}
                                // value={this.state.first_name}
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
                                onChangeText={(last_name) => this.setState({last_name})}
                                // value={this.state.last_name}
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
                                onChangeText={(email) => this.setState({email})}
                                // value={this.state.email}
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
                                onChangeText={(phone_no) => this.setState({phone_no})}
                                // value={this.state.phone_no}
                            />
                        </View>
                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="birthday-cake" size={18} color="#FFFFFF"/>
                            <DatePicker
                                style={styles.inputBox}
                                
                                mode="date"
                                placeholder="Select date"
                                format="DD-MM-YYYY"
                                date={this.state.dob}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                placeholderText: {
                                    color: '#ffffff',
                                    fontSize:16,
                                },
                                dateIcon: {
                                    height:0,
                                    width:0
                                },
                                dateInput: {
                                    borderColor:'transparent',
                                    height:43,
                                    justifyContent: 'flex-start',
                                    alignItems:'flex-start',
                                    alignContent:'flex-start',
                                    paddingTop:12,
                                    paddingBottom:12,
                                    paddingLeft:3,
                                },
                                dateText:{
                                    color: '#fff',
                                    fontSize:16,
                                  }
                                }}
                                onDateChange={(dob) => {this.setState({dob: dob})}}
                            />
                            {/* <TextInput
                                ref={(phoneNo) => {this.Phone= phoneNo}}
                                style={styles.inputBox}
                                placeholder="DOB"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="done"
                                underlineColorAndroid='transparent'
                                onChangeText={(dob) => this.setState({dob})}
                                // value={this.state.dob}
                            /> */}
                        </View>

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={this._editDetails}>
                            <Text style={styles.btnText}>EDIT PROFILE</Text>
                        </TouchableOpacity>


                        </View>

                </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </View> 
            </ImageBackground>
            
            )
        }
}
