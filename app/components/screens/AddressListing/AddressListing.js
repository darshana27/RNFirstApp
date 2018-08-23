import React from 'react';
import { Text, View,Image, ScrollView,Dimensions,TouchableOpacity,AsyncStorage,TextInput} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../../header/header';
import {Radio,Right,Left,ListItem} from 'native-base';

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
                    <ListItem>
                        <Left>
                        <Radio selected={false} />
                        </Left>
                        <Right>
                            <View>
                                <Text>Glen Dmello</Text>
                                <Text>Lorem ipsum dolor sit amet lorem ipsum</Text>
                            </View>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                        <View>
                                <Text>Glen Dmello</Text>
                                <Text>Lorem ipsum dolor sit amet lorem ipsum</Text>
                            </View>
                        
                        </Left>
                        <Right>
                        <Radio selected={true} />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                        <Radio selected={false} />
                        </Left>
                        <Right>
                            <View>
                                <Text>Glen Dmello</Text>
                                <Text>Lorem ipsum dolor sit amet lorem ipsum</Text>
                            </View>
                        </Right>
                    </ListItem>
                    </View>
            </View>
        )
    }
}