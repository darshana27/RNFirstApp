import { StyleSheet,Dimensions } from 'react-native';
// import * as appStyles from '../../../styles/appStyles';
import * as Colors from '../../../utils/colors';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container:{
        height:Dimensions.get('window').height-80,
        width:Dimensions.get('window').width,
        flexDirection:'row',
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
        width:'72%',
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
        height:'100%',
        width:'14%',
        justifyContent:'flex-end',
        paddingBottom:10,
    },
    itemContainer : {  
        width:'100%',
        flexDirection:'row',
        // padding:5,
        height:80,
        // paddingLeft:6,
        backgroundColor:'#ffffff',
    }
})