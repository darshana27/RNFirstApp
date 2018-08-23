import React from 'react';
import { Text, View,Image, ScrollView,Dimensions,TouchableOpacity,AsyncStorage,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../header/header';


let fetchApi=require('../../../lib/api').fetchApi();

export default class AddressListing extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    componentDidMount(){}

    render(){
            return(
            <View>
                    <Header 
                        styles={styles.header} 
                        title={'Address Listing'}
                        back={() => {this.props.navigation.goBack()}}/>
                    
                    <View>
                        

                    </View>
            </View>
        )
    }
}