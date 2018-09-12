import React, {Component} from 'react';
import {AsyncStorage,View,Alert} from 'react-native'
import * as urls from '../../../lib/urls';
import Loader from '../../Loader/Loader';
let fetchApi=require('../../../lib/api').fetchApi();
import {user_data,serviceProvider} from '../../../lib/serviceProvider';
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import {userAction} from '../../../redux/actions/userAction'

class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
        this.callbackFnFetch=this.callbackFnFetch.bind(this);
    }

    componentDidMount() {

        AsyncStorage.getItem('user_access_token')
            .then((value) => {
                if (value != null) {
                    try{
                        fetchApi.fetchData(''+urls.host_url+urls.user_fetch_details,'GET',{},null,this.callbackFnFetch)
                    }
                    catch(err){
                        Alert.alert(
                            'Exit App',
                            'No Internet Connection', [{
                                text: 'Exit App',
                                onPress: () => BackHandler.exitApp(),
                                style: 'cancel'
                            }, {
                                text: 'Try Again',
                                onPress: () => this.componentDidMount()
                            }, ], {
                                cancelable: false
                            }
                        )
                    }
                }    
                    else {
                    console.log('Key is null');
                    this.props.navigation.replace('Login')
                }
            })
    }
    callbackFnFetch(response){
        if (response.status != 200) {
            AsyncStorage.removeItem('user_access_token')
            this.props.navigation.replace('Login')
        } else {
            serviceProvider.setUsrData(response.data)
            this.props.userAction(response.data)
            this.props.navigation.replace('Homescreen')
        }
    }
    render() {
        return ( 
            <Loader/>  
        );
    }
}

function mapStateToProps(state){
    return {
      details:state.user
    }
  }

export default connect(mapStateToProps,{ userAction })(StartUp)