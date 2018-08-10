import React, {
    Component
} from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    Alert
} from 'react-native'

export default class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user_access_token')
            .then((value) => {
                console.log(value);
                if (value != null) {

                    // const data=JSON.parse(value);
                    // this.setState({user_access_token:data})
                    // console.log(this.state.user_access_token)
                    console.log(value);
                    fetch(`http://staging.php-dev.in:8844/trainingapp/api/users/getUserData`, {
                            method: 'GET',
                            headers: {
                                'access_token': JSON.parse(value)
                            }
                        })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response)
                            if (response.status != 200) {
                                throw Error(response.message)
                                AsyncStorage.removeItem('user_access_token')
                                // Alert.alert('Something went wrong.Please try again later')
                                this.props.navigation.replace('Login')
                                // AsyncStorage.setItem('screen','Login')
                            } else {

                                this.props.navigation.replace('Homescreen', {
                                    'data': response
                                })
                                console.log(response.data.product_categories)

                            }
                        })
                        .catch(err => {
                            alert('Something went wrong.Please try again later' )
                        })
                } else {
                    console.log('Key is null');
                    //   this.setState({isLoggedin:false,isVerifying:false})
                    this.props.navigation.replace('Login')
                }
            })
    }

    render() {

        return (

            <
            ActivityIndicator style = {
                {
                    marginTop: '70%'
                }
            }
            /> 

        );
    }
}