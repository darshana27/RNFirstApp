import React, {Component} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity,AsyncStorage,ScrollView} from 'react-native';
import styles from './styles';
import {Badge} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import {user_data,serviceProvider} from '../lib/serviceProvider';
import Icon from '../utils/icon'
import { connect } from 'react-redux'
import {userAction,editData} from '../redux/actions/userAction'


class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state={
           
        }
    }
    componentDidMount(){
    }
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
        var defaultPic=require('../assets/user_placeholder.png');
        var userPic={uri:this.props.details.user_data.profile_pic}
        var profile_pic=this.props.details.user_data.profile_pic!=null?userPic:defaultPic
   return(
            <View style={styles.mainView}>
            <ScrollView>
            <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('MyAccount')}
                style={styles.header}>
                {this.props.details.user_data.profile_pic==''||this.props.details.user_data.profile_pic==null?
                    <Image source={require('../assets/user_placeholder.png') }
                        style={styles.roundedImage}/>:
                        <Image 
                        style={styles.roundedImage}
                        source={{uri:this.props.details.user_data.profile_pic}}/>
                }
                {/* <Image 
                style={styles.roundedImage}
                source={profile_pic}/> */}
                <Text style={styles.Username}>{this.props.details.user_data.first_name+' '+this.props.details.user_data.last_name}</Text>
                <Text style={styles.UserEmail}>{this.props.details.user_data.email}</Text>
            </TouchableOpacity>
            <FlatList
                data={[
                    // {img:require('../assets/images/Chair.png'),key:'Homescreen'},
                    {icon:"cart",key:'My Cart',screenName:'MyCart',value:0},
                    {icon:"table",key:'Tables',screenName:'productListing',value:1,category:1},
                    {icon:"sofa",key:'Sofa',screenName:'productListing',value:2,category:3},
                    {icon:"chair",key:'Chairs',screenName:'productListing',value:3,category:2},
                    {icon:"cupboard",key:'Cupboards',screenName:'productListing',value:4,category:4},
                    {icon:"user",key:'My Account',screenName:'MyAccount',value:5},
                    {icon:"location",key:'Store Locator',screenName:'StoreLocator',value:6},
                    {icon:"order-list",key:'My Orders',screenName:'MyOrders',value:7},
                    {icon:"logout",key:'Logout',screenName:'Login',value:8},
                ]}
                keyExtractor={(item,index) => ''+index}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem = { ({item,index}) => 
                    <TouchableOpacity
                    
                    style={styles.container}
                    onPress={this.isLogout.bind(this,item)}>
                        <Icon 
                            color='#FFFFFF'
                            size={20}
                            name={item.icon}
                            style={styles.icon}
                            source={item.img}/>
                        <Text style={styles.item}>{item.key}</Text>
                        <View style={styles.badgeView}>
                            {(item.key==='My Cart')? <Badge style={styles.badge} containerStyle={{ backgroundColor: 'red'}} value={this.props.details.total_carts} textStyle={{ color: 'white' }}/>: null}
                        </View>
                     </TouchableOpacity> }
            ></FlatList>
            </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state){
    return {
      details:state.user
    }
  }

export default connect(mapStateToProps,{ userAction,editData })(Sidebar)