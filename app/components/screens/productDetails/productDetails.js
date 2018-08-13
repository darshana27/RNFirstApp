import React from 'react';
import { View,StyleSheet, Text,Alert,Image,ScrollView,Dimensions,TouchableOpacity,TextInput,Share} from 'react-native';
import Header from '../../header/header';
import StarRating from 'react-native-star-rating';
import styles from './styles';
import {furniture} from './images';
import * as Colors from '../../../utils/colors';
import * as fontSize from '../../../utils/fontSizes';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
// import Share, {ShareSheet, Button} from 'react-native-share';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';


export default class productDetails extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isModal1Visible:false,
      isModal2Visible:false,
      productID:0,
      starCount:0,
      productDet:{},
      currentImg:'',
      isShareVisible:false
     
    }
      this._toggleModal1 = this._toggleModal1.bind(this);
      this._toggleModal2 = this._toggleModal2.bind(this);
      this.rateNow=this.rateNow.bind(this);
      this.callbackFn=this.callbackFn.bind(this);
  }

  // onCancel() {
  //   console.log("CANCEL")
  //   this.setState({isShareVisible:false});
  // }
  // onOpen() {
  //   console.log("OPEN")
  //   this.setState({isShareVisible:true});
  // }

  componentDidMount(){
    const { navigation } = this.props;
    const product_id=navigation.getParam('product_id')
    console.log(product_id);
   this.setState({productID:product_id})
    // this.setState({ productId : product_id})

    fetchApi.fetchData(''+urls.host_url+urls.get_product_details+'?product_id='+product_id,'GET',{},null,this.callbackFn)
    // fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=`+product_id,
    // {method:'GET'}
    // )
    // .then(response => response.json())
    // .then(response => {

    // })
    // const product_id=this.props.navigation.getParam('product_id')
  }
  callbackFn(response){
    console.log("Product Details Callback called")
    console.log(response.data)
    this.setState({productDet:response.data})
    this.setState({currentImg:this.state.productDet.product_images[0].image})
    // console.log("ComponentDidMount currimg:"+this.state.currentImg)
    console.log(this.state.productDet.product_images[0].image)
  }
  onClick() {
    Share.share({
      message: this.state.productDet.description,
      url: 'https://www.neosofttech.com/',
      title: 'NeoSTORE - '+this.state.productDet.name
    }, {
      // Android only:
      dialogTitle: 'NeoSTORE',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }
  rateNow(){  
    let formData=new FormData();
    formData.append('product_id',this.state.productID);
    formData.append('rating',this.state.starCount);
    console.log(this.state.productID)
    fetchApi.fetchData(''+urls.host_url+urls.set_product_ratings,'POST',null,formData,this.callbackRating)
    this._toggleModal1()
      // fetch('http://staging.php-dev.in:8844/trainingapp/api/products/setRating',
      // {
      //   method:'POST',
      //  body: formData,
      // }
      // )
      // .then(response => response.json())
      // .then(response => {

        
      // })
      
    }
    callbackRating(response){
      console.log(response)
      if(response.status==200){
        alert(response.message)
      }
    }
    _toggleModal1(){
      console.log("function called")
      this.setState({ isModal1Visible: !this.state.isModal1Visible });
    }
    _toggleModal2(){
      console.log("function called")
      this.setState({ isModal2Visible: !this.state.isModal2Visible });
    }

    onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
    }

    changeImage(image){
      this.setState({currentImg:image})
    }

  multipleImages(data){
    
     
      if(data!=undefined && Object.keys(data).length>0)
        return data.product_images.map((element) => {
          // console.log(element.image)
          // this.setState({currentImg:element.image})
          // console.log("current image :"+this.state.currentImg)
         return (
          <TouchableOpacity 
          onPress={this.changeImage.bind(this,element.image)}
          style={styles.imageTO}> 
          <Image style={styles.imgSmall} 
          source={{uri:element.image}} />
        </TouchableOpacity>
         ) 

      })               
  }
  // multipleImages(){
  //   let imageset=[]
  //   let images = this.state.productDet.product_images.map(element => {
  //     return
  //     <TouchableOpacity style={styles.img1} onPress={}> 
  //       <Image src={{uri:element.image}} />
  //     </TouchableOpacity>
  //   });
  //   imageset.append(images)
  //   return images
  // }
  render() {

    // let shareOptions = {
    //   title: "React Native",
    //   message: "Hola mundo",
    //   url: "http://facebook.github.io/react-native/",
    //   subject: "Share Link" //  for email
    // };
    // console.log(productDet)
    // const itemName = navigation.getParam('itemName');
    // const itemProducer=navigation.getParam('itemProducer');
    // const itemRating=navigation.getParam('itemRatings');
    // const itemPrice=navigation.getParam('itemPrice');
    // const itemDesc=navigation.getParam('itemDesc');
        
    return (

      <View style={styles.container}>


        <Modal isVisible={this.state.isModal1Visible}>
          <View style={styles.ModalView}>
            <Text style={styles.modalRatingName}>{this.state.productDet.name}</Text>
            <Image style={styles.modalRatingImage} source={furniture[0].image2_url}></Image>
            <View style={styles.starRating}>
            <StarRating
              
              disabled={false}
              starSize={40}
              maxStars={5}
              halfStarEnabled={true}
              emptyStar={'star'}
              emptyStarColor={Colors.lightGray}
              fullStarColor={Colors.starFilled}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            </View>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={this.rateNow}>
              <Text>RATE NOW</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal isVisible={this.state.isModal2Visible}>
          <View style={styles.ModalView2}>
            <Text style={styles.modalRatingName}>{this.state.productDet.name}</Text>
            <View style={styles.modalImageView}>
              <Image style={styles.modalQtyImage} source={furniture[0].image2_url}></Image>
            </View>
            <Text style={styles.modalText}>Enter Qty</Text>
            <TextInput 
              style={styles.modalTextInput}
              underlineColorAndroid='transparent'></TextInput>
            <TouchableOpacity
              style={styles.modalQtyBtn}
              onPress={this._toggleModal2}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Header 
          styles={styles.header} 
          title={this.state.productDet.name}
          isSearch={true}
          back={() => {this.props.navigation.goBack()}} />
    
        <ScrollView>
          <View style={styles.itemDetails}>
            <View style={styles.leftContent}>
              <Text style={styles.productHeading}>{this.state.productDet.name}</Text>
              <Text style={styles.productCategory}>Category - Tables </Text>
              <Text style={styles.productProducer}>{this.state.productDet.producer}</Text>
            </View>
            <View style={styles.rightContent}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.productDet.rating}
                fullStarColor={Colors.starFilled}
                starSize={13}
                emptyStar={'star'}
                emptyStarColor={Colors.lightGray}/>
            </View>
            </View>
            <View style={styles.cardView}>
                <View style={styles.priceShare}>
                  <Text style={styles.price}>Rs. {this.state.productDet.cost}</Text>
                  <TouchableOpacity onPress={this.onClick.bind(this)}>
                  <MaterialIcon style={styles.iconStyle} name="share" size={fontSize.xxLarge}/></TouchableOpacity>
                </View>
                <View style={styles.mainImg}>
                { 
                  this.state.currentImg?
                  <Image style={styles.imgBig} source={{uri:this.state.currentImg}}/>
                  :null
                }
                </View>
                <ScrollView contentContainerStyle={{justifyContent:'space-between'}} style={styles.productImgs} horizontal={true}>
                {
                  this.multipleImages(this.state.productDet)
                //  this.state.productDet!=undefined && Object.keys(this.state.productDet).length>0 ? 
                //  this.state.productDet.product_images.map((element) => {
                //    return (
                //     <TouchableOpacity
                //       onPress={this.setState({currentImg:element.image})} 
                //       style={styles.imageTO}> 

                //     <Image style={styles.imgSmall} 
                //     source={{uri:element.image}} />
                //   </TouchableOpacity>
                //    ) 
          
                // })  : null
                  }
                </ScrollView>
                
                {/* <View style={styles.productImgs}>
          
                  <View style={styles.img1}>
                    <Image style={styles.imgSmall} source={furniture[0].image1_url}/>    
                  </View>
                  <View style={styles.img1}>
                    <Image style={styles.imgSmall} source={furniture[0].image2_url}/>
                  </View>
                  <View style={styles.img1}>
                    <Image style={styles.imgSmall} source={furniture[0].image3_url}/>
                  </View>
                 </View> */}
                <View style={styles.productDesc}>
                  <Text style={styles.descHeading}>DESCRIPTION</Text>
                  <Text style={styles.descText}>{this.state.productDet.description}</Text>
                </View>
          </View>
          <View style={styles.buttons}>
              <TouchableOpacity
                onPress={this._toggleModal2}
                style={styles.buyNowBtn}>
                <Text style={styles.btnText}>BUY NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._toggleModal1}
                style={styles.rateBtn}>
                <Text style={styles.btnText}>RATE</Text>
              </TouchableOpacity>
          </View>  
        </ScrollView>
      </View>   
    );
  }
}
