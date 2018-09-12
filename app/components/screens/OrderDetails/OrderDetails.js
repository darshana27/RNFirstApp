import React from 'react';
import { View,FlatList, Text,ScrollView,TouchableOpacity,Image } from 'react-native';
import Header from '../../header/header';
import styles from '../OrderDetails/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Loader from '../../Loader/Loader';

export default class OrderDetails extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading:true,
        }
        this.callbackFn=this.callbackFn.bind(this);
    }

    componentDidMount(){
        orderId=this.props.navigation.getParam('orderID');
        console.log(orderId)
        fetchApi.fetchData(''+urls.host_url+urls.order_details+'?order_id='+orderId,'GET',{},null,this.callbackFn)

    }
    callbackFn(response){
        if(response.status==200){
            this.setState({dataSource:response.data.order_details,
            cost:response.data.cost,isLoading:false})
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
                    title={'Order ID::'+this.props.navigation.getParam('orderID')}
                    isSearch={true}
                    isAdd={false}
                    back={() => {this.props.navigation.goBack()}}/>
                    {this.state.isLoading?<Loader/>:
                    <ScrollView>
                     <FlatList     
                        data={this.state.dataSource}
                        keyExtractor={(item,index) => ''+item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem = { ({item,index}) => 
                        
                        <TouchableOpacity>
                            <View style={styles.itemContainer}>
                            <View style={styles.productImage}>
                                <Image 
                                    style={styles.img}
                                    source={{uri:item.prod_image}}/>
                            </View>
                            <View style={styles.productDetails}>
                                <Text style={styles.item}>{item.prod_name}</Text>
                                <Text style={styles.producer}>({item.prod_cat_name})</Text>
                                <Text style={styles.qty}>QTY : {item.quantity}</Text>
                            </View>
                            <View style={styles.itemCost}>
                                    <Text style={styles.cost}>₹{item.total}</Text>
                            </View>            
                            </View> 
                            </TouchableOpacity>
                            }
                        ></FlatList>
                         <View style={styles.totalView}>
                                <View style={styles.leftContent}><Text style={styles.textTotal}>TOTAL</Text></View>
                                <View style={styles.rightContent}><Text style={styles.textAmount}>₹{this.state.cost}</Text></View>
                        </View>
                    </ScrollView>}
            </View>
        )
    }
}