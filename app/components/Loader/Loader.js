import React from 'react';
import {View} from 'react-native'; 
import {ActivityIndicator} from 'react-native-elements';

export default class Loader extends Component{
    constructor(props){
        super(props);
    }
    render(){  
        if(props.visible == true) {
            return (
                <ActivityIndicator
                    animating = {true}
                    size="large"
                    style={{flex:1,
                            justifyContent:'center',
                            color:'yellow'}}
                />
            );
        }
        else{
            return null;
        }
        return(
            <View></View>
        )
}}