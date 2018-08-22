import React from 'react';
import { Text, View,Image, ScrollView,Dimensions,TouchableOpacity,AsyncStorage,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../header/header';
import styles from '../AddAddress/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Modal from "react-native-modal";
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

export default class AddAddress extends React.Component {
    constructor(props){
        super(props);
        this.state={
            address:'',
            city:'',
            landmark:'',
            state:'',
            zipcode:'',
            country:''
        };
        this.addAddress=this.addAddress.bind(this); 
    }

    componentDidMount(){
        console.log(this.state.address,this.state.city)
        
    }

    addAddress(){
        console.log(this.state.address)
        var formData=new FormData();
    
        
    }

    render(){
        return(
        <View>
            <Header styles={styles.header} title={'Add Address'}
                    back={() => {this.props.navigation.goBack()}} />
            <ScrollView>
            <View style={styles.viewStyle}>
                <Text style={styles.text}>ADDRESS</Text>

                <TextInput
                    placeholder="ADDRESS"
                    style={styles.textArea}
                    underlineColorAndroid="transparent" 
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(address) => this.setState({address})}/>

                <Text style={styles.text}>CITY</Text>

                <TextInput 
                    placeholder="CITY"
                    underlineColorAndroid="transparent"
                    style={styles.cityInput}/>

                <View style={styles.rowView}>
                    
                    <View style={styles.colView}>
                        <Text style={styles.text}>CITY</Text>
                        <TextInput 
                            placeholder="CITY"
                            underlineColorAndroid="transparent"
                            style={styles.smallInput}></TextInput>
                        <Text style={styles.text}>ZIP CODE</Text>
                        <TextInput 
                            placeholder="ZIP CODE"
                            underlineColorAndroid="transparent"
                            style={styles.smallInput}></TextInput>
                    </View>
                    <View style={styles.colView}>
                        <Text style={styles.text}>STATE</Text>
                        <TextInput 
                            placeholder="STATE"
                            underlineColorAndroid="transparent"
                            style={styles.smallInput}></TextInput>
                        <Text style={styles.text}>COUNTRY</Text>
                        <TextInput 
                            placeholder="COUNTRY"
                            underlineColorAndroid="transparent"
                            style={styles.smallInput}></TextInput>
                    </View>

                </View>
                <TouchableOpacity
                    style={styles.btnAddAddress}
                    onPress={this.addAddress}>
                    <Text style={styles.btnText}>SAVE ADDRESS</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        )
    }
}