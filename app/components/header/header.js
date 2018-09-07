import React, { Component } from 'react';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from '../../utils/icon'

export default class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.backContainer}
                    onPress={this.props.back}>
                {this.props.isDrawer ? <MaterialIcon name="menu" size={26} style={styles.menuIcon} color="#fff" /> : <MaterialIcon name="chevron-left" size={26} style={styles.menuIcon} color="#fff" />}
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.text}>
                        {this.props.title}
                    </Text>       
                </View>
                {/* <View style={styles.rightContainer}> */}
                <TouchableOpacity style={styles.rightContainer}
                    onPress={this.props.search}>
                                {this.props.isSearch ? <Icon name="search" size={26} style={styles.menuIcon} color="#fff" /> : null}
                                {this.props.isAdd ? <Icon name="plus" size={21} style={styles.menuIcon} color="#fff" /> : null}
                </TouchableOpacity>
                {/* </View> */}
            </View>
        )
    }
}