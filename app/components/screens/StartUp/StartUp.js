import React, {Component} from 'react';
import {AsyncStorage,View,Alert} from 'react-native'
import * as urls from '../../../lib/urls';
import Loader from '../../Loader/Loader';
let fetchApi=require('../../../lib/api').fetchApi();
import {user_data,serviceProvider} from '../../../lib/serviceProvider';
import SplashScreen from 'react-native-splash-screen'

export default class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
        this.callbackFnFetch=this.callbackFnFetch.bind(this);
    }

    componentDidMount() {
        // SplashScreen.hide();
        AsyncStorage.getItem('user_access_token')
            .then((value) => {
                // console.log(value);
                if (value != null) {
                    // console.log(value);
                    try{
                    fetchApi.fetchData(''+urls.host_url+urls.user_fetch_details,'GET',{},null,this.callbackFnFetch)
                    }catch(err){
                        Alert.alert(err.message)
                    }
                    // fetch(`http://staging.php-dev.in:8844/trainingapp/api/users/getUserData`, {
                    //         method: 'GET',
                    //         headers: {
                    //             'access_token': JSON.parse(value)
                    //         }
                    //     })
                    //     .then(response => response.json())
                    //     .then(response => {
                    }    
                    else {
                    console.log('Key is null');
                    //   this.setState({isLoggedin:false,isVerifying:false})
                    this.props.navigation.replace('Login')
                }
            })
    }
    callbackFnFetch(response){

        // console.log('COUNT : '+response.data.total_carts)
        if (response.status != 200) {
            // throw Error(response.message)
            AsyncStorage.removeItem('user_access_token')
            // Alert.alert('Something went wrong.Please try again later')
            this.props.navigation.replace('Login')
            // AsyncStorage.setItem('screen','Login')
        } else {
            console.log(response)
            serviceProvider.setUsrData(response.data)
            this.props.navigation.replace('Homescreen')
            // console.log(response.data.product_categories)
        }
    }
    render() {
        return (
         
            <Loader/>
           
        );
    }
}
