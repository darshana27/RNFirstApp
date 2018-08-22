import React, { Component } from 'react';
import {KeyboardAvoidingView,ImageBackground,Alert, ScrollView, Text, TextInput, View, TouchableOpacity,ActivityIndicator,Platform,Image} from 'react-native';
import styles from './styles';
import Header from '../../header/header';
import Loader from '../../Loader/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import DatePicker from 'react-native-datepicker';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
var ImagePicker = require('react-native-image-picker');
let validators=require('../../../utils/validators').validators();
import {user_data,serviceProvider} from '../../../lib/serviceProvider';


export default class EditProfile extends Component{
    
    constructor(props){
        super(props);
       
        this.state={
            checked:false,
            access_token:'',
            first_name:null,
            last_name:null,
            email:null,
            phone_no:null,
            dob:null,
            avatarSource:null,
            isPicSelected:false,
            isLoading:false,
            isfetching:false,
            // userDet:this.props.navigation.state.params.data,
            userDet:user_data.user_details.data.user_data
        };
        this._editDetails=this._editDetails.bind(this); 
        this.onPressPicture=this.onPressPicture.bind(this);
    }
    getInitialState(){
        return {
          value: 0,
        }
      }
      async componentDidMount(){

    }
    _editDetails(){
        this.setState({isfetching:true})
        this.state.avatarSource!=""?console.log(this.state.avatarSource):console.log("null")
        let formData=new FormData();
        formData.append("first_name",this.state.first_name!=null?this.state.first_name:this.state.userDet.first_name)
        formData.append("last_name",this.state.last_name!=null?this.state.last_name:this.state.userDet.last_name)
        formData.append("profile_pic",this.state.isPicSelected?this.state.avatarSource:this.state.userDet.profile_pic)
        formData.append("email",this.state.email!=null?this.state.email:this.state.userDet.email);
        formData.append("dob",this.state.dob!=null?this.state.dob:this.state.userDet.dob);
        formData.append("phone_no",this.state.phone_no!=null?this.state.phone_no:this.state.userDet.phone_no);
        console.log(formData)
        console.log("editDetails() :"+this.state.access_token);      
        fetchApi.fetchData(''+urls.host_url+urls.user_update_details,'POST',{},formData,this.callbackFn)
    }
    callbackFn(response){   
        console.log(response)
            if(response.status==200){
               
                serviceProvider.setData('user_updated_details',response.data)
                Alert.alert(response.user_msg)
            }
            else{
              
                Alert.alert(response.user_msg)
            } 
    }
    onPressPicture(){
        this.setState({isLoading:true})
        var options = {
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };
        ImagePicker.showImagePicker(options, (response) => {
            
            console.log('Response = ', response);
            console.log("Image Picker")
            if (response.didCancel) {
                this.setState({isLoading:false,})
              console.log('User cancelled image picker');
            }
            else if (response.error) {
                this.setState({isLoading:false,})
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                this.setState({isLoading:false,})
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
            //   let source = { uri: response.uri };
              let source = { uri: 'data:image/jpeg;base64,' + response.data };
                
              this.setState({
                
                isPicSelected:true,
                avatarSource: source.uri,
                isLoading:false,
              });
            }
          });
    }

    render(){  
        console.log(this.state.avatarSource)
        var defaultFile=this.state.userDet.profile_pic
        var user_pic=this.state.avatarSource
        var profile_pic_url = this.state.avatarSource!=null?user_pic:defaultFile;

        var valueFname=this.state.first_name==null?this.state.userDet.first_name:this.state.first_name;
        var valueLname=this.state.last_name==null?this.state.userDet.last_name:this.state.last_name;
        var valueEmail=this.state.email==null?this.state.userDet.email:this.state.email;
        var valuePhone=this.state.phone_no==null?this.state.userDet.phone_no:this.state.phone_no
        var valueDob=this.state.dob==null?this.state.userDet.dob:this.state.dob

        console.log("Profile Pic : "+this.state.userDet.profile_pic)
        console.log(this.state.avatarSource)
         return (
            <ImageBackground source={require('../../../assets/images/Android_Master_bg.jpg')} style={styles.backgroundImage}>

            <View style={styles.viewStyle}>
                <View> 
                    <Header styles={styles.header} title={'Edit Profile'}
                            back={() => {
                                this.props.navigation.navigate('MyAccount')
                                }} />
                </View>
                {this.state.isupdating?<Loader/>:null}
                <KeyboardAvoidingView style={styles.viewStyle} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                <View style={styles.viewStyle}>
                <TouchableOpacity
                style={{height:122,width:122,borderWidth:2,borderColor:'white',borderRadius:60,top:20}}
                onPress={this.onPressPicture}>
                {this.state.isLoading?<ActivityIndicator style={{marginTop:36}} size='large' animating={true}/>:
                    <Image              
                        style={styles.roundedImage}
                        source={{uri:profile_pic_url}}/>}
                </TouchableOpacity>
                      <View style={{marginTop:40}}>

                        <View style={styles.nestedView}>

                            <Icon style={styles.iconStyle} name="user" size={20} color="#FFFFFF"/>

                            <TextInput
                                editable={true}
                                placeholder="First Name"
                                multiline={false}
                                style={styles.inputBox}
                                underlineColorAndroid="transparent"
                                placeholderTextColor='#FFFFFF'
                                
                                onChangeText={(first_name) => this.setState({first_name})}
                                value={valueFname}
                                // value={this.state.first_name}
                            />
                            
                        </View>

                        <View style={styles.nestedView}>
                            <Icon style={styles.iconStyle} name="user" size={20} color="#FFFFFF"/>
                            <TextInput
                                editable={true}
                                style={styles.inputBox}
                                placeholder="Last Name"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="next"
                                ref={(lastName) => {this.Lname= lastName}}
                                onSubmitEditing={() => {this.Email.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                value={valueLname}
                                onChangeText={(last_name) => this.setState({last_name})}
                                // value={this.state.last_name}
                            />
                        </View>

                        <View style={styles.nestedView}>
                            <MaterialIcon style={styles.iconStyle} name="email" size={20} color="#FFFFFF"/>
                            <TextInput
                                editable={true}
                                ref={(emailID) => {this.Email= emailID}}
                                style={styles.inputBox}
                                placeholder="Email"
                                placeholderTextColor='#FFFFFF'
                                returnKeyType="next"
                                onSubmitEditing={() => {this.Password.focus();} }
                                blurOnSubmit={false}
                                underlineColorAndroid='transparent'
                                value={valueEmail}
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
                                value={valuePhone}
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
                                date={valueDob}
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
