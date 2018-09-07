import React from 'react';
import { View,FlatList, Text,ScrollView,TouchableOpacity } from 'react-native';
import Header from '../../header/header';
import styles from '../MyOrders/styles';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Loader from '../../Loader/Loader';


export default class MyOrders extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading:true
    }
    this.callbackFn=this.callbackFn.bind(this);
  }

  componentDidMount(){
    fetchApi.fetchData(''+urls.host_url+urls.order_list,'GET',{},null,this.callbackFn)
  }
  callbackFn(response){
    console.log(response.data)
    if(response.status==200){

      this.setState({dataSource:response.data,isLoading:false})
    }
    else{
      console.log("enable to fetch")
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
  render() {
    return (
      <View style={styles.container}>
        <Header 
            styles={styles.header} 
            title={'My Orders'}
            isSearch={true}
            isAdd={false}
            back={() => {this.props.navigation.goBack()}}/>
        {this.state.isLoading?<Loader/>:
        <ScrollView>
        <FlatList
            data={this.state.dataSource}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.1}
            ItemSeparatorComponent={this.renderSeparator}
            // refreshing={this.state.refreshing}
            // onRefresh={this.handleRefresh}
            keyExtractor={(item,index) => ''+item.id}
            ListFooterComponent={this.renderFooter}
            renderItem = { ({item,index}) => 
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('OrderDetails',{'orderID':item.id})}>
                <View style={styles.itemContainer}>
                      <View style={styles.productDetails}>
                          <Text style={styles.item}>Order ID : {item.id}</Text>
                          <View
                              style={styles.horizontalRule}
                            />
                          <Text style={styles.producer}>Ordered Date : {item.created}</Text>
                          
                      </View>
                      <View style={styles.ratingsView}>
                        <Text style={styles.price}>₹{item.cost}</Text>
                      </View>            
                     </View>
              </TouchableOpacity>
            }>
        </FlatList>
        </ScrollView>}
      </View>
    );
  }
}
