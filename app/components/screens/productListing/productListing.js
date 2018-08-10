import React from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';

import Header from '../../header/header';
import styles from '../productListing/styles';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {Loader} from '../../Loader/Loader';

export default class productListing extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      product_category_id:0,
    
    }
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

    const category_id = this.props.navigation.getParam('category_id');
    console.log("category_id", category_id)
    // this.setState({product_category_id:category_id})
    

    // console.log("sidebar_category", sidebar_category);
    {category_id!==null?
    fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=`+category_id,
          {method:'GET'}
        )
        .then(response => response.json())
        .then(responseJson => {
             
          this.setState({ 
            dataSource: responseJson.data,
          }, function(){
  
          });
        })
      :
      fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=`+sidebar_category,
      {method:'GET'}
      )
      .then(response => response.json())
      .then(responseJson => {
     
      this.setState({   
        dataSource: responseJson.data,
      }, function(){

      });
    })}
   
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
    console.log(screen)
    console.log(this.state.isLoading)

   
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
                data={this.state.dataSource}
                
                ItemSeparatorComponent={this.renderSeparator}
                renderItem = { ({item}) => 
                
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
            ></FlatList>
        </View>
      </View>
    );
  }
}