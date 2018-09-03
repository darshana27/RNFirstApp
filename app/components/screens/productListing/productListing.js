import React from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import Loader from '../../Loader/Loader';
import Header from '../../header/header';
import styles from '../productListing/styles';
import StarRating from 'react-native-star-rating';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import SearchBar from 'react-native-searchbar';

// import {Loader} from '../../Loader/Loader';

export default class productListing extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      list:[],
      page:1,
      refreshing:false
    }
    
    this.callback=this.callback.bind(this)
    // this.callbackFn=this.callbackFn.bind(this);
  }
    componentDidMount(){

      console.log("componentdidmount")
      this.makeRemoteRequest()

    }

    makeRemoteRequest(){
    
      console.log("makeremoterequest")
      const category_id = this.props.navigation.getParam('category_id');
      this.setState({isLoading:true})
      setTimeout(()=>{
        fetchApi.fetchData(''+urls.host_url+urls.get_product_list+'?product_category_id='+category_id+'&page='+this.state.page+'&limit='+7,'GET',{},null,this.callback)
      },200)
    }
    
    callback(response){
      this.setState({isLoading:false})
      if(response.status==200){
      this.setState({
        list:[...this.state.list,...response.data],
        refreshing:false,
        isLoading:false
      })
      console.log(this.state.list)
    } 

      else{
        this.setState({
          isLoading:false,
          refreshing:false
        })
        console.log(response)
      }
      
    }
    // handleRefresh =() => {
    //   this.setState({
    //     page:1,
    //     refreshing:true
    //   },() => this.makeRemoteRequest())
    // }
    handleLoadMore = () => {
        this.setState({
          page:this.state.page + 1
        },() => {this.makeRemoteRequest();
        })
       
    }
    // renderFooter = () =>{
    //   if(!this.state.refreshing && !this.state.isLoading) return null;
    //   return(
    //     <View
    //       style={{paddingVertical:20,borderTopWidth:1,borderColor:'blue',backgroundColor:'cyan'}}>
    //     <Loader/>
    //     </View>
    //   )
    // }              
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
    console.log(this.state.list.length)
  
    return (
      <View>
        <View> 
          {this.props.navigation.getParam('category_id')==1?
          <Header styles={styles.header}   
                  title="Tables"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} 
                  search={() => {this.searchBar.show()}}/>:null}
          {this.props.navigation.getParam('category_id')==2?
          <Header styles={styles.header}   
                  title="Chairs"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} 
                  search={() => {this.searchBar.show()}}/>:null}
          {this.props.navigation.getParam('category_id')==3?
          <Header styles={styles.header}   
                  title="Sofas"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} 
                  search={() => {this.searchBar.show()}}/>:null}
          {this.props.navigation.getParam('category_id')==4?
          <Header styles={styles.header}   
                  title="Cupboards"
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} 
                  search={() => {this.searchBar.show()}}/>:null}
          {this.props.navigation.getParam('category_id')==null?
          <Header styles={styles.header}   
                  title={screen}
                  isSearch={true}
                  back={() => {this.props.navigation.goBack()}} 
                  search={() => {this.searchBar.show()}}/>:null}
        </View>
        <SearchBar
                    backgroundColor='#9e0100'
                    iconColor='#ffffff'
                    heightAdjust={-10}
                    ref={(ref) => this.searchBar = ref}
                    onBlur={()=>this.searchBar.hide()}
                />
        <View style={styles.container}>

        <FlatList
        
                data={this.state.list}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.1}
                ItemSeparatorComponent={this.renderSeparator}
                // refreshing={this.state.refreshing}
                // onRefresh={this.handleRefresh}
                keyExtractor={(item,index) => ''+item.id}
                ListFooterComponent={this.renderFooter}
                renderItem = { ({item,index}) => 
                
                <TouchableOpacity 
               
                onPress={()=>{this.props.navigation.navigate('productDetails',{product_id:item.id})}}>
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
            {this.state.isLoading?<Loader/>:null}
        </View>
        <View style={styles.indicatorView}><Text style={{color:'#FFF'}}>Showing {this.state.list.length} out of {this.state.list.length}</Text></View>
      </View>
    );
  }
}