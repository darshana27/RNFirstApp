import React from 'react';
import { View,Text,Image,ScrollView,Vibration,TouchableOpacity,TextInput,Share,Dimensions} from 'react-native';
import Header from '../../header/header';
import StarRating from 'react-native-star-rating';
import styles from './styles';
import * as Colors from '../../../utils/colors';
import * as fontSize from '../../../utils/fontSizes';
import Modal from "react-native-modal";
import { Toast } from 'native-base'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
let fetchApi=require('../../../lib/api').fetchApi();
import * as urls from '../../../lib/urls';
import Loader from '../../Loader/Loader';
import { connect } from 'react-redux'
import {userAction,totalCart} from '../../../redux/actions/userAction'

class productDetails extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isModal1Visible:false,
      isModal2Visible:false,
      isModal2Visible:false,
      starCount:0,
      productDet:{},
      currentImg:'',
      product_quantity:0,
      isLoading:true
    }
      this._toggleModal1 = this._toggleModal1.bind(this);
      this._toggleModal2 = this._toggleModal2.bind(this);
      this._toggleModal3 = this._toggleModal3.bind(this);
      this.rateNow=this.rateNow.bind(this);
      this.onSubmit=this.onSubmit.bind(this);
      this.callbackFn=this.callbackFn.bind(this);
      this.callbackAddToCart=this.callbackAddToCart.bind(this);
  }

  componentDidMount(){
    const { navigation } = this.props;
    product_id=navigation.getParam('product_id')
    this.setState({productID:product_id})
    fetchApi.fetchData(''+urls.host_url+urls.get_product_details+'?product_id='+product_id,'GET',{},null,this.callbackFn)
  }
  callbackFn(response){

    if(response.status==200){
      this.setState({
        isLoading:false,
        productDet:response.data,
        })
        this.setState({currentImg:this.state.productDet.product_images[0].image})
    }
    else{
      console.log(response)
    }
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
    formData.append('product_id',product_id);
    formData.append('rating',this.state.starCount);
    fetchApi.fetchData(''+urls.host_url+urls.set_product_ratings,'POST',{},formData,this.callbackRating)
    this._toggleModal1() 
    }
    callbackRating(response){
      Vibration.vibrate(300)
      if(response.status==200){
        console.log(response)
        Toast.show({
          text: "Rating Successful!",
          buttonText: "Okay",
          duration: 10000,
          position:'bottom',
        })

      }
      else{
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
    _toggleModal3(){
      console.log("function called")
      this.setState({ isModal3Visible: !this.state.isModal3Visible });
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
         return (
          <TouchableOpacity 
          key={element}
          onPress={this.changeImage.bind(this,element.image)}
          style={styles.imageTO}> 
          <Image style={styles.imgSmall} 
          source={{uri:element.image}} />
        </TouchableOpacity>
         ) 
      })               
  }
  onSubmit(){
    let formData1=new FormData();
    formData1.append('product_id',product_id)
    formData1.append('quantity',this.state.product_quantity)
    this.state.product_quantity != null ?
    fetchApi.fetchData('http://staging.php-dev.in:8844/trainingapp/api/addToCart','POST',{},formData1,this.callbackAddToCart):
    console.log("Null")
    this._toggleModal2()
  }

  callbackAddToCart(response){
    Vibration.vibrate(300)
      if(response.status==200){
        Toast.show({
          text: "Product added to cart!",
          buttonText: "Okay",
          duration: 5000,
          position:'bottom',
          
        })
        this.props.totalCart(response.total_carts)
      }
      else{
        alert(response.message)
      }
  }

  render() {
      
    return (

      <View style={styles.container}>
        <Modal 
          isVisible={this.state.isModal1Visible}
          onBackdropPress={() => this.setState({ isModal1Visible: false })}>
          <View style={styles.ModalView}>
              <View style={styles.closeBtn}>
                <TouchableOpacity onPress={()=>this.setState({ isModal1Visible: false })} style={styles.closeStyle}>
                  <MaterialIcon name="close" size={20}/>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalRatingName}>{this.state.productDet.name}</Text>
              <Image style={styles.modalRatingImage} source={{uri:this.state.currentImg}}></Image>
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
                <Text style={styles.modalBtnTxt}>RATE NOW</Text>
              </TouchableOpacity>
          </View>
        </Modal>

        <Modal 
          isVisible={this.state.isModal2Visible}
          onBackdropPress={() => this.setState({ isModal2Visible: false })}>
          <View style={styles.ModalView2}>
            <View style={styles.closeBtn}>
              <TouchableOpacity onPress={()=>this.setState({ isModal2Visible: false })} style={styles.closeStyle}>
                <MaterialIcon name="close" size={20}/>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalRatingName}>{this.state.productDet.name}</Text>
            <View style={styles.modalImageView}>
              <Image style={styles.modalQtyImage} source={{uri:this.state.currentImg}}></Image>
            </View>
            <Text style={styles.modalText}>Enter Qty</Text>
            <TextInput 
              keyboardType='numeric'
              style={styles.modalTextInput}
              underlineColorAndroid='transparent'
              onChangeText={(product_quantity) => this.setState({product_quantity})}></TextInput>
            <TouchableOpacity
              style={styles.modalQtyBtn}
              onPress={this.onSubmit}>
              <Text style={styles.modalBtnTxt}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal 
          isVisible={this.state.isModal3Visible}
          onBackdropPress={() => this.setState({ isModal3Visible: false })}>
          <View style={styles.ModalView3}>
            <View style={styles.closeBtn}>
              <TouchableOpacity onPress={()=>this.setState({ isModal3Visible: false })} style={styles.closeStyle}>
                <MaterialIcon name="close" color='#fff' size={20}/>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.modalImageView2}> */}
              <Image style={styles.modalQtyImage} source={{uri:this.state.currentImg}}></Image>
            {/* </View> */}
          </View>
        </Modal>

        <Header 
          styles={styles.header} 
          title={this.state.productDet.name}
          isSearch={true}
          back={() => {this.props.navigation.goBack()}} />
         <View>
        <ScrollView style={{height:Dimensions.get('window').height-155}}>
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
                  <MaterialIcon style={styles.iconStyle} name="share" size={fontSize.xxLarge}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.mainImg}  onPress={this._toggleModal3}>
                { this.state.isLoading?<Loader/>:
                  this.state.currentImg?
                  <Image style={styles.imgBig} source={{uri:this.state.currentImg}}/>
                  :null
                }
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{justifyContent:'space-between'}} style={styles.productImgs} horizontal={true}>
              {this.multipleImages(this.state.productDet)}
            </ScrollView>
            <View style={styles.productDesc}>
              <Text style={styles.descHeading}>DESCRIPTION</Text>
              <Text style={styles.descText}>{this.state.productDet.description}</Text>
            </View>
          </View>
          </ScrollView>
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
 
      </View>   
    );
  }
}
function mapStateToProps(state){
  return {
    details:state.user
  }
}

export default connect(mapStateToProps,{ userAction,totalCart })(productDetails)

