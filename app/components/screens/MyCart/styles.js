import { StyleSheet,Dimensions } from 'react-native';
// import * as appStyles from '../../../styles/appStyles';
import * as Colors from '../../../utils/colors';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container:{
        height:Dimensions.get('window').height-80,
        width:Dimensions.get('window').width,
        // flexDirection:'row',
        padding:7,
    //    height:150,
        // paddingLeft:6,
        backgroundColor:Colors.white,
        
    },
    productImage:{
        height:'100%',
        width:'14%',
        alignContent:'center',
        justifyContent:'center',

    },
    productDetails:{
        height:'100%',
        width:'70%',
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
        fontSize:12,
        
        fontFamily:fontRegular
    },
    ratingsView:{
        height:'100%',
        width:'16%',
        justifyContent:'flex-end',
        paddingBottom:10,
    },
    itemContainer : {  
        width:'100%',
        flexDirection:'row',
        // padding:5,
        height:80,
        // paddingLeft:6,
        backgroundColor:Colors.white,
    },
    toast:{
        // width:Dimensions.get('window').width,
        backgroundColor:Colors.lightGray,
   
        marginTop:30
    },
    backRow:{
        height:80,alignContent:'flex-end',justifyContent:'center',alignItems:'flex-end'
    },
    deleteContainer:{
        height:45,width:45,backgroundColor:'red',borderRadius:50,alignItems:'center',justifyContent:'center',right:10
    },
    modalDropdown:{
        width:30,height:30,alignItems:'flex-start',justifyContent:'center'
    },
    dropdownContainer:{
        flexDirection:'row',backgroundColor:'#EDEDED',width:50,alignItems:'center',justifyContent:'center',borderRadius:5,padding:3
    }
})