import React,{Component} from 'react';
 
import {View,ActivityIndicator,Dimensions} from 'react-native';

export default class Loader extends Component{
    constructor(props){
        super(props);
    }
    render(){  
            return (
                <View 
                style={{borderWidth:1,height:Dimensions.get('window').height,width:Dimensions.get('window').width,borderColor:'black',position:'absolute',justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator
                    animating = {true}
                    size="large"
                    color="red"
                />
                </View>
            );
}}