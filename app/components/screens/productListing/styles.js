import { StyleSheet,Dimensions } from 'react-native';
// import * as appStyles from '../../../styles/appStyles';
import * as Colors from '../../../utils/colors';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container:{
        height:Dimensions.get('window').height-80,
        width:Dimensions.get('window').width,
        flexDirection:'row',
        
    //    height:150,
        // paddingLeft:6,
        backgroundColor:Colors.white,
        // borderWidth:1,
        // borderColor:'red'
    },
    productImage:{
        height:'100%',
        width:'14%',
        alignContent:'center',
        justifyContent:'center',
    },
    productDetails:{
        height:'100%',
        width:'71.5%',
        paddingLeft:14,
        alignContent:'flex-start',
        justifyContent:'center',
    },
    img:{
        height:50,
        width:55,
    },
    item:{
        fontSize:15,
        color:Colors.productHeading1,
        // fontWeight:'bold',
        // borderColor:'blue',
        // borderWidth:1,
        fontFamily:fontMedium
    },
    producer:{
        fontSize:14,
        color:Colors.productHeading1,
        fontFamily:fontRegular
    },
    price:{
        marginTop:5,
        color:Colors.productPrice,
        fontSize:18,
        fontFamily:fontRegular
    },
    ratingsView:{
        right:5,
        // marginRight:10,
        height:'100%',
        width:'16%',
        justifyContent:'flex-end',
        paddingBottom:10,
        // borderWidth:1,
        // borderColor:'black'
    },
    itemContainer : {  
        width:'100%',
        flexDirection:'row',
        padding:5,
        height:80,
        // paddingLeft:6,
        backgroundColor:'#ffffff',
        // borderColor:'yellow',
        // borderWidth:1
    },
    toast:{
        // width:Dimensions.get('window').width,
        backgroundColor:Colors.lightGray,
        marginTop:30
    },
    indicatorView:{
        width:Dimensions.get('window').width,
        bottom:0,position:'absolute',
        height:30,
        opacity:0.8,
        backgroundColor:Colors.orderID,
        alignItems:'center',
        justifyContent:'center'
    }
})