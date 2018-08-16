import React from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';

import Header from '../../header/header';
import styles from '../productListing/styles';
import StarRating from 'react-native-star-rating';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {Loader} from '../../Loader/Loader';

export default class productListing extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      product_category_id:1,
      list:[],
      page:1,
      refreshing:true
    }
    
    this.callback=this.callback.bind(this)
    // this.callbackFn=this.callbackFn.bind(this);
  }


  // componentWillMount(){
  //   setTimeout(() => {
  //     this.setState({
  //       isLoading:false
  //     })
  //   },
  //   1500)
  // }
                  componentDidMount(){

                    console.log("componentdidmount")
                    this.makeRemoteRequest()
                  //   console.log("ComponentDidMount")
                  //   const category_id = this.props.navigation.getParam('category_id');
                  //   console.log("category_id", category_id)
                  //   category_id!==null?
                  //   fetchApi.fetchData(''+urls.host_url+urls.get_product_list+'?product_category_id='+category_id,'GET',{},null,this.callbackFn)
                  //   :console.log("Null") 
                  // }
                  // callbackFn(response){
                  //   console.log(response)
                  //   console.log("Callback called")
                  //   this.setState({ 
                  //     dataSource: response.data,
                  //   });
                  }
  // callbackFnSidebar(response){
  //   this.setState({   
  //     dataSource: responseJson.data,
  //   }, function(){

  //   });
  // }
  // fetchResult = ()=>{
  //   // const limit=6
  //   // const page=1
  //   console.log("ComponentDidMount")
  //   const category_id = this.props.navigation.getParam('category_id');
  //   console.log("category_id", category_id)
  //   category_id!==null?
  //   fetchApi.fetchData(''+urls.host_url+urls.get_product_list+'?product_category_id='+category_id+'&limit=100','GET',{},null,this.callbackFnLazy)
  //   :console.log("Null") 
  //   };
  
  //   callbackFnLazy = (response) =>{
  //     console.log(response)
  //     this.setState({dataSource: response.data})
  //     console.log(this.state.dataSource.length)
  //     const { offset ,limit, list} = this.state;
  //     this.setState({maxlimit:this.state.dataSource.length})
      
  //       if(response.data!=null){
  //         this.setState({ 
  //           list: list.concat(this.state.dataSource.slice(offset,offset+6<limit?limit:offset+6)),
  //           offset: offset + 6,
  //           limit: limit+6
  //         })
  //         console.log(this.state.list)
  //         console.log(this.state.limit)
  //         console.log(this.state.offset)
  //   }}
    makeRemoteRequest(){
      console.log("makeremoterequest")
      const category_id = this.props.navigation.getParam('category_id');
      // console.log(category_id)
      // this.setState({product_category_id:category_id})
      // console.log("Set state : "+this.state.product_category_id)
      // console.log("Page : "+this.state.page)
      setTimeout(()=>{
        fetchApi.fetchData(''+urls.host_url+urls.get_product_list+'?product_category_id='+category_id+'&page='+this.state.page+'&limit='+7,'GET',{},null,this.callback)
      },1000)
      this.setState({isLoading:true})
      
    }
    callback(response){
      if(response.status==200){
      this.setState({
        list:[...this.state.list,...response.data],
        refreshing:false,
        isLoading:false
      })
    }
      else{
        console.log(response)
      }
      console.log(this.state.list)
    }
    handleRefresh =() => {
      this.setState({
        refreshing:true
      },() => this.makeRemoteRequest())
    }
    handleLoadMore = () => {
        this.setState({
          page:this.state.page + 1
        },() => {this.makeRemoteRequest();
        })
       
    }
    renderFooter = () =>{
      if(!this.state.isLoading) return null;
      return(
        <View
          style={{paddingVertical:20,borderTopWidth:1,borderColor:'blue'}}>
        <ActivityIndicator animating size="large"></ActivityIndicator>
        </View>
      )
    }              
    renderSeparator = () => (
      <View
        style={{
          backgroundColor: '#222',
          height: 1,
          opacity:0.7
        }}
      />
    );
  
  render() {
    const { navigation } = this.props;
    const screen = navigation.getParam('screen');
    // console.log(screen)
    // console.log(this.state.isLoading)

   
    return (
      <View>
        <View> 
          {this.props.navigation.getParam('category_id')==1?
          <Header styles={styles.header}   
                  title="Tables"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==2?
          <Header styles={styles.header}   
                  title="Chairs"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==3?
          <Header styles={styles.header}   
                  title="Sofas"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==4?
          <Header styles={styles.header}   
                  title="Cupboards"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
          {this.props.navigation.getParam('category_id')==null?
          <Header styles={styles.header}   
                  title={screen}
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} />:null}
        </View>
        <View style={styles.container}>
        
        <FlatList
        
                data={this.state.list}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.7}
                ItemSeparatorComponent={this.renderSeparator}
                refreshing={this.handleRefresh}
                ListFooterComponent={this.renderFooter}
                renderItem = { ({item,index}) => 
                
                <TouchableOpacity key={index} onPress={()=>{this.props.navigation.navigate('productDetails',{product_id:item.id})}}>
                    <View style={styles.itemContainer}>
                      <View style={styles.productImage}>
                          <Image 
                              style={styles.img}
                              source={{uri:item.product_images}}/>
                      </View>
                      <View style={styles.productDetails}>
                          <Text style={styles.item}>{item.name}</Text>
                          <Text style={styles.producer}>{item.producer}</Text>
                          <Text style={styles.price}>Rs.{item.cost}</Text>
                      </View>
                      <View style={styles.ratingsView}>
                      
                        <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={item.rating}
                                fullStarColor='#FFBA00'
                                starSize={10}
                                emptyStar={'star'}
                                emptyStarColor='#7F7F7F'/>
                      </View>            
                     </View> 
                     </TouchableOpacity>
                     }
            ></FlatList>
        </View>
      </View>
    );
  }
}