import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Loader from '../../Loader/Loader';
import Header from '../../header/header';
import styles from '../productListing/styles';
import StarRating from 'react-native-star-rating';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import SearchBar from 'react-native-searchbar';


export default class productListing extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      list:[],
    }
    
    this.callback=this.callback.bind(this)
  }
    componentDidMount(){
      page=1
      this.makeRemoteRequest()
    }

    makeRemoteRequest(){
      const category_id = this.props.navigation.getParam('category_id');
      this.setState({isLoading:true})
      fetchApi.fetchData(''+urls.host_url+urls.get_product_list+'?product_category_id='+category_id+'&page='+page+'&limit='+7,'GET',{},null,this.callback)
    }
    
    callback(response){
      if(response.status==200){
        this.setState({
          list:[...this.state.list,...response.data],
          isLoading:false
        })
      } 
      else{
        this.setState({
          isLoading:false,
        })
      }

    }

    handleLoadMore = () => {
      page=page+1;
      this.makeRemoteRequest()   
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
                keyExtractor={(item,index) => ''+item.id}
                ListFooterComponent={this.renderFooter}
                renderItem = { ({item,index}) => 
                
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('productDetails',{product_id:item.id})}}>
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
            >
          </FlatList>
          {this.state.isLoading?<Loader/>:null}
        </View>
        <View style={styles.indicatorView}><Text style={{color:'#FFF'}}>Showing {this.state.list.length} out of {this.state.list.length}</Text></View>
      </View>
    );
  }
}