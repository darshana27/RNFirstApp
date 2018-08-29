import React from 'react';
import { View,FlatList, Text,ScrollView,TouchableOpacity } from 'react-native';
import Header from '../../header/header';
import styles from '../MyOrders/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';

export default class OrderDetails extends React.Component {
    constructor(props){
        super(props);
        this.state ={
      
        }
        this.callbackFn=this.callbackFn.bind(this);
    }

    componentDidMount(){
        var orderId=this.props.navigation.getParam('orderID');
        console.log(orderId)
        let formData=new FormData();
        formData.append('order_id',orderId)
        fetchApi.fetchData(''+urls.host_url+urls.order_details+'?product_id='+product_id,'GET',{},null,this.callbackFn)

    }
    callbackFn(response){
        if(response.status==200){
            this.setState({dataSource:response.data})
        }
    }
    renderSeparator = () => (
        <View
          style={{
            backgroundColor: '#4f4f4f',
            height: 1,
            opacity:0.7
          }}
        />
      );
    render(){
        return(
            <View style={styles.container}>
                <Header 
                    styles={styles.header} 
                    title={'My Orders'}
                    isSearch={true}
                    isAdd={false}
                    back={() => {this.props.navigation.goBack()}}/>
                    <ScrollView>
                     <FlatList     
                        data={this.state.dataSource}
                        keyExtractor={(item,index) => ''+item.id}
                        renderItem = { ({item,index}) => 
                        
                        <TouchableOpacity 
                    
                        onPress={()=>{this.props.navigation.navigate('productDetails',{product_id:item.id})}}>
                            <View style={styles.itemContainer}>
                            <View style={styles.productImage}>
                                <Image 
                                    style={styles.img}
                                    source={{uri:item.prod_image}}/>
                            </View>
                            <View style={styles.productDetails}>
                                <Text style={styles.item}>{item.order_details.prod_name}</Text>
                                <Text style={styles.producer}>{item.order_details.prod_cat_name}</Text>
                                <Text style={styles.price}>QTY : {item.order_details.quantity}</Text>
                            </View>
                            <View style={styles.ratingsView}>
                                    <Text style={styles.cost}>₹{item.order_details.cost}</Text>
                            </View>            
                            </View> 
                            </TouchableOpacity>
                            }
                        ></FlatList>
                    </ScrollView>
            </View>
        )
    }
}