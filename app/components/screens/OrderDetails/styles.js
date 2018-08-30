import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
import * as fontSizes from '../../../utils/fontSizes';
import { fontMedium,fontBold,fontRegular } from '../../../styles/appStyles';
//import * as fontStyless from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:Colors.white
    },
    itemContainer : {  
        width:'100%',
        flexDirection:'row',
        padding:5,
        height:80,
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
        fontSize:fontSizes.large,
        color:Colors.orderID,
        // fontWeight:'bold',
        // borderColor:'blue',
        // borderWidth:1,
        fontWeight:'400',
        fontFamily:fontRegular
    },
    producer:{
        fontSize:fontSizes.medium,
        color:Colors.productHeading1,
        fontStyle: 'italic'
    },
    qty:{
        color:Colors.descContent,
        marginTop:5,
        fontSize:fontSizes.medium,
        fontFamily:fontRegular,
       
    },
    itemCost:{
        fontSize:fontSizes.medium,
        fontFamily:fontRegular,
        color:Colors.descContent,
        alignItems:'center',
        justifyContent:'flex-end',
        paddingBottom:10
    },
    leftContent:{
        width:Dimensions.get('window').width-180,
        justifyContent:'center',
    },
    rightContent:{
        width:Dimensions.get('window').width-210,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    textTotal:{
        left:20,
        color:Colors.descContent,
        fontFamily:fontMedium
    },
    textAmount:{
        right:20,
        color:Colors.descContent,
        fontFamily:fontMedium
    },
    totalView:{
        height:80,
        flexDirection:'row',
        width:Dimensions.get('window').width,
        borderTopWidth:1,
        borderTopColor:Colors.descContent,
        borderBottomWidth:1,
        borderBottomColor:Colors.descContent

    },
})