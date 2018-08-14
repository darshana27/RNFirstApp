import React, {Component} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity,AsyncStorage} from 'react-native';
import styles from './styles';
import {Badge} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});


export default class Sidebar extends Component {
    isLogout=(item) =>{
        // debugger;
        console.log(this.props)
        // this.props.navigation.dispatch(resetAction);
        // this.props.navigation.replace('Login');
        if(item.key==='Logout'){
            // 
            // AsyncStorage.setItem('user_access_token',null)
            AsyncStorage.removeItem('user_access_token')
            this.props.navigation.replace('Login')
            
        }
        else if(item.key==='Tables'|| item.key==='Sofa' || item.key==='Chairs' || item.key==='Cupboards'){
            console.log(item.category)
            this.props.navigation.navigate(item.screenName,{'category_id':item.category})
        }
        else{
            this.props.navigation.navigate(item.screenName,{'screen':item.key})
        }        
    }

    renderSeparator = () => (
        <View
          style={{
            backgroundColor: '#000',
            height: 0.5,
          }}
        />
      );
    render(){

   return(
            <View style={styles.mainView}>
            <View style={styles.header}>
                <Image 
                style={styles.roundedImage}
                source={require('../assets/user_placeholder.png')}/>
                <Text style={styles.Username}>Kinjal Jain</Text>
                <Text style={styles.UserEmail}>kinjal.jain@wwindia.com</Text>
            </View>
            <FlatList
                data={[
                    // {img:require('../assets/images/Chair.png'),key:'Homescreen'},
                    {img:require('../assets/cart.png'),key:'My Cart',screenName:'MyCart',value:0},
                    {img:require('../assets/tables.png'),key:'Tables',screenName:'productListing',value:1,category:1},
                    {img:require('../assets/sofa.png'),key:'Sofa',screenName:'productListing',value:2,category:3},
                    {img:require('../assets/chairs.png'),key:'Chairs',screenName:'productListing',value:3,category:2},
                    {img:require('../assets/cupboards.png'),key:'Cupboards',screenName:'productListing',value:4,category:4},
                    {img:require('../assets/userAccount.png'),key:'My Account',screenName:'MyAccount',value:5},
                    {img:require('../assets/storeLocator.png'),key:'Store Locator',screenName:'StoreLocator',value:6},
                    {img:require('../assets/myOrders.png'),key:'My Orders',screenName:'MyOrders',value:7},
                    {img:require('../assets/logout.png'),key:'Logout',screenName:'Login',value:8},
                    {img:require('../assets/logout.png'),key:'Reset Password',screenName:'ForgotPassword',value:8},
                ]}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem = { ({item}) => 
                    <TouchableOpacity
                    style={styles.container}
                    onPress={this.isLogout.bind(this,item)}>
                        <Image 
                            style={styles.icon}
                            source={item.img}/>
                        <Text style={styles.item}>{item.key}</Text>
                        {(item.key==='My Cart')? <Badge style={styles.badge} containerStyle={{ backgroundColor: 'red'}} value={2} textStyle={{ color: 'white' }}/>: null}
                         
                     </TouchableOpacity> }
            ></FlatList>
            </View>
        );
    }
}