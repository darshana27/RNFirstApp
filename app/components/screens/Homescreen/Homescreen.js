import React, { Component } from 'react';
import { View, Text,Image, ScrollView,TouchableOpacity,Alert,ActivityIndicator } from 'react-native';
import styles from './styles';
import Header from '../../header/header';
import Swiper from 'react-native-swiper';
import {imgSliderData} from './images';
import { DrawerActions } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class Homescreen extends Component{
    constructor(props){
        super(props);
        console.log(this.props.navigation.state.params.data.data.product_categories)
        this.state={
            isLoading:true,
            category_id:'',
            imageArray:this.props.navigation.state.params.data.data.product_categories

        }
        this._TableBtnPressed = this._TableBtnPressed.bind(this);
        this._ChairBtnPressed = this._ChairBtnPressed.bind(this);
        this._SofaBtnPressed = this._SofaBtnPressed.bind(this);
        this._CupboardBtnPressed = this._CupboardBtnPressed.bind(this);
    }

    componentWillMount(){
        const { navigation } = this.props;
        const udata=navigation.getParam('data')
        // console.log("here:  "+JSON.stringify(this.state.user_data.data))
        console.log(this.state.imageArray)
        this.setState({
            user_data:udata
        })

    }

    SwiperImages(){
        console.log('swiperimages')
        console.log(this.state.imageArray.length)
        var filteredArray=[]
        for(var i=0;i<=3;i++){
            filteredArray.push(this.state.imageArray[i])  
            console.log(filteredArray[0].icon_image)    
        }
        console.log(filteredArray[0])
        if(filteredArray!=undefined && filteredArray.length>0)
          return filteredArray.map((element) => {
            // console.log(element.image)
            // this.setState({currentImg:element.image})
            // console.log("current image :"+this.state.currentImg)
            console.log(element[0])
           return (
  
                <View style={styles.slides}>
                    <Image 
                        style={styles.slideImages}
                        source={{uri:element.icon_image}}/>
                </View>
           ) 
  
        })              
    }
    // componentWillMount(){
    //     setTimeout(() => {
    //       this.setState({
    //         isLoading:false
    //       })
    //     },
    //     1000)
    //   }
    _TableBtnPressed(){ 
        this.props.navigation.navigate('productListing',{'category_id':1});
    }
    _ChairBtnPressed(){ 
        this.props.navigation.navigate('productListing',{'category_id':2});
    }
    _SofaBtnPressed(){    
        this.props.navigation.navigate('productListing',{'category_id':3});
    }
    _CupboardBtnPressed(){ 
        this.props.navigation.navigate('productListing',{'category_id':4});
    }
    render(){
        // console.log(imgSliderData[0].image1_url)
        return (
        //     this.state.isLoading?
        //     <View style={{flex:1,backgroundColor:'white',opacity:1
              
        //       }}>
        //     <ActivityIndicator
        //               animating = {true}
        //               size="large"
        //               color='red'
        //               style={{flex:1,
        //                       marginTop:'50%',
        //                       opacity:1,
        //                       position:'absolute', left:0, right:0, bottom:0, top:0 
        //                     }}
        //           />
        //   </View>
        //   :
            <View style={{flex: 1}}>
                <View> 
                    <Header styles={styles.header} 
                        title={'NeoSTORE'}
                        isDrawer={true}
                        isSearch={true}
                            back={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}} />
                </View>
                <View style={styles.viewSwiper}>
                <Swiper style={styles.wrapper} 
                showsButtons={false}
                dotColor="red"
                activeDotColor="#000"
                loop={true}
                autoplay={true}> 
                    {this.SwiperImages()}
                    </Swiper>
                </View>
                <View style={styles.cards}>
                <View style={styles.cardRow}>
                        <TouchableOpacity 
                        onPress={this._TableBtnPressed} style={styles.cardTable}>
                            <Text style={styles.tablesTxt}>Tables</Text>
                            <MaterialIcon style={styles.tableImg} name="event-seat" size={80}/>
                            {/* <Image 
                                style={styles.tableImg}
                                source={require('../../../assets/images/Tables.png')}/> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._SofaBtnPressed} style={styles.cardSofa}>
                        <MaterialIcon style={styles.sofaImg} name="airline-seat-recline-extra" size={80}/>
                                <Text style={styles.SofaTxt}>Sofas</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardRow}>
                        <TouchableOpacity onPress={this._ChairBtnPressed} style={styles.cardChair}>
                        <Text style={styles.chairTxt}>Chairs</Text>
                        <MaterialIcon style={styles.chairImg} name="airline-seat-individual-suite" size={80}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._CupboardBtnPressed} style={styles.cardCupboard}>
                        <MaterialIcon style={styles.cupboardImg} name="storage" size={80}/>
                                <Text style={styles.cupboardTxt}>Cupboards</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
}