import React, {Component} from 'react';
import { Text, TextInput,AsyncStorage } from 'react-native';
import Sidebar from '../containers/Sidebar';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Login from '../components/screens/Login/Login';
import Register from '../components/screens/Register/Register';
import Homescreen from '../components/screens/Homescreen/Homescreen';
import productListing from '../components/screens/productListing/productListing';
import productDetails from '../components/screens/productDetails/productDetails';
import MyCart from '../components/screens/MyCart/MyCart';
import MyAccount from '../components/screens/MyAccount/MyAccount';
import StoreLocator from '../components/screens/StoreLocator/StoreLocator';
import MyOrders from '../components/screens/MyOrders/MyOrders';
import ForgotPassword from '../components/screens/ForgotPassword/ForgotPassword';
import ForgotPwd from '../components/screens/ForgotPwd/ForgotPwd';
import EditProfile from '../components/screens/EditProfile/EditProfile';
import StartUp from '../components/screens/StartUp/StartUp';

/** allowfontscaling is to avoid fontscaling when device fonts are changed */
Text.defaultProps.allowFontScaling=false;
TextInput.defaultProps.allowFontScaling=false;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName:this.props.screen     
    }
  }
  componentDidMount(){
  
  }
  render() {
    return(
      <Stack/>
    )
  }
}

const Drawer=createDrawerNavigator({
  Homescreen: {
    screen:Homescreen,
    title: Homescreen,
  },
  MyCart:{
  screen:MyCart,
  title:MyCart,
  },
  
  MyAccount:{
    screen:MyAccount,
    title:MyAccount,
  },
  EditProfile:{
    screen:EditProfile,
    title:EditProfile,
  },
  StoreLocator:{
    screen:StoreLocator,
    title:StoreLocator,
  },
  MyOrders:{
    screen:MyOrders,
    title:MyOrders,
  },
  productListing:{
    screen:productListing,
    title:productListing,
  },

},{
drawerPosition : "left",
drawerWidth:250,
contentComponent: ({ navigation }) => (<Sidebar navigation={navigation} />),}
)
//screen added in stack navigator
const Stack = createStackNavigator({
  StartUp: {
    screen:StartUp,
    title:StartUp,
    navigationOptions: {
      header:null
    }
  },
  Login: {
    screen: Login,
    title: Login,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    title: Register,
    navigationOptions: {
      header: null
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    title: ForgotPassword,
    navigationOptions: {
      header: null
    }
  },
  ForgotPwd: {
    screen: ForgotPwd,
    title: ForgotPwd,
    navigationOptions: {
      header: null
    }
  },
  Homescreen: {
    screen:Drawer,
    title: Homescreen,
    navigationOptions:{
      header:null
    }
  },
  productDetails:{
    screen:productDetails,
    title:productDetails,
    navigationOptions:{
      header:null
    }
  },
}, {initialRouteName: 'StartUp'});

export default Main;