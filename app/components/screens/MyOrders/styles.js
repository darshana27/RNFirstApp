import { StyleSheet,Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
import * as fontSize from '../../../utils/fontSizes';
// import * as appStyles from '../../../styles/appStyles';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text:{
          fontSize:30,
          fontWeight:'bold',
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
    productDetails:{
        height:'100%',
        width:'71.5%',
        paddingLeft:14,
        alignContent:'flex-start',
        justifyContent:'center',
    },
    ratingsView:{
        right:5,
        // marginRight:10,
        height:'100%',
        width:'25%',
        justifyContent:'center',
        alignItems:'center'
        // borderWidth:1,
        // borderColor:'black'
    },
    item:{
        fontSize:fontSize.large,
        color:Colors.orderID,
        fontWeight:'200',
        fontFamily:fontMedium
    },
    producer:{
        marginTop:7,
        fontSize:fontSize.medium,
        color:Colors.productHeading1,
        fontFamily:fontRegular
    },
    price:{
        fontSize:fontSize.xxLarge,
        color:Colors.descContent,
        fontFamily:fontRegular
    },
    horizontalRule:{
        marginTop:7,
        width:'60%',
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
    }
})