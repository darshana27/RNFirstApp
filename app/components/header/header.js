import React, { Component } from 'react';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.backContainer}
                    onPress={this.props.back}>
                {this.props.isDrawer ? <FeatherIcon name="menu" size={26} style={styles.menuIcon} color="#fff" /> : <FeatherIcon name="chevron-left" size={26} style={styles.menuIcon} color="#fff" />}
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.text}>
                        {this.props.title}
                    </Text>       
                </View>
                {/* <View style={styles.rightContainer}> */}
                <TouchableOpacity style={styles.rightContainer}
                    onPress={this.props.back}>
                                {this.props.isSearch ? <FeatherIcon name="search" size={26} style={styles.menuIcon} color="#fff" /> : <FeatherIcon name="" size={26} style={styles.menuIcon} color="#fff" />}
                </TouchableOpacity>
                {/* </View> */}
            </View>
        )
    }
}