import React, { Component } from 'react';
import { View, Text,Image, ScrollView,TouchableOpacity,Alert,ActivityIndicator } from 'react-native';
import styles from './styles';
import Header from '../../header/header';
import Swiper from 'react-native-swiper';
import { DrawerActions } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {user_data,serviceProvider} from '../../../lib/serviceProvider';
import SearchBar from 'react-native-searchbar';
import SplashScreen from 'react-native-splash-screen';
import Icon from '../../../utils/icon'

export default class Homescreen extends Component{
    constructor(props){
        super(props); 
        console.log(user_data)
        this.state={
            isLoading:true,
            category_id:'',
            // imageArray:this.props.navigation.state.params.data.data.product_categories
            imageArray:user_data.product_categories
        }
        this._TableBtnPressed = this._TableBtnPressed.bind(this);
        this._ChairBtnPressed = this._ChairBtnPressed.bind(this);
        this._SofaBtnPressed = this._SofaBtnPressed.bind(this);
        this._CupboardBtnPressed = this._CupboardBtnPressed.bind(this);
    }

    componentDidMount(){
        SplashScreen.hide()
    }

    SwiperImages(){
        console.log()
        // console.log('swiperimages')
        console.log(this.state.imageArray.length)
        var filteredArray=[]
        for(var i=0;i<=3;i++){
            filteredArray.push(this.state.imageArray[i])  
            // console.log(filteredArray[0].icon_image)    
        }
        // console.log(filteredArray[0])
        if(filteredArray!=undefined && filteredArray.length>0)
          return filteredArray.map((element) => {
           return (
                <View key={element} style={styles.slides}>
                    <Image 
                        style={styles.slideImages}
                        source={{uri:element.icon_image}}/>
                </View>
           ) 
  
        })              
    }

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
        return (
            
            <View style={{flex: 1}}>
                <View> 
                    <Header styles={styles.header} 
                        title={'NeoSTORE'}
                        isDrawer={true}
                        isSearch={true}
                            back={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}} 
                            search={() => {this.searchBar.show()}}/>
                </View>
                <SearchBar
                autoplayTimeout={2}
                    backgroundColor='#9e0100'
                    iconColor='#ffffff'
                    heightAdjust={-10}
                    ref={(ref) => this.searchBar = ref}
                    onBlur={()=>this.searchBar.hide()}
                />
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
                            <Icon style={styles.tableImg} name="table" size={80}/>
                            {/* <Image 
                                style={styles.tableImg}
                                source={require('../../../assets/images/Tables.png')}/> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._SofaBtnPressed} style={styles.cardSofa}>
                        <Icon style={styles.sofaImg} name="sofa" size={80}/>
                                <Text style={styles.SofaTxt}>Sofas</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardRow}>
                        <TouchableOpacity onPress={this._ChairBtnPressed} style={styles.cardChair}>
                        <Text style={styles.chairTxt}>Chairs</Text>
                        <Icon style={styles.chairImg} name="chair" size={80}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._CupboardBtnPressed} style={styles.cardCupboard}>
                        <Icon style={styles.cupboardImg} name="cupboard" size={80}/>
                                <Text style={styles.cupboardTxt}>Cupboards</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
}