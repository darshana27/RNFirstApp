import { StyleSheet,Dimensions } from 'react-native';
// import * as appStyles from '../../../styles/appStyles';
import * as Colors from '../../../utils/colors';
import * as fontSizes from '../../../utils/fontSizes';

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
        fontSize:fontSizes.medium2,
        color:Colors.productHeading1,
        // fontWeight:'bold',
        // borderColor:'blue',
        // borderWidth:1,
        fontFamily:fontMedium
    },
    producer:{
        fontSize:fontSizes.small,
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
        width:'100%',height:30,justifyContent:'center'
    },
    dropdownContainer:{
        flexDirection:'row',backgroundColor:'#EDEDED',width:50,alignItems:'center',justifyContent:'center',borderRadius:5,padding:3
    },
    ddstyle:{
        alignItems:'center',justifyContent:'center',height:'100%',width:'100%',flexDirection:'row'
    },
    ModalView:{
        backgroundColor:Colors.white,
        height:'20%',
        width:'100%',
        borderRadius:10,
        alignItems:'center',
        padding:20,      
    },
    modalRatingText:{
        fontFamily:fontRegular,
        fontSize:fontSizes.large
    },
    ModalBtns:{
        marginTop:20,
        flexDirection:'row',
        justifyContent: 'space-between'
    },

    btnText:{
        color:Colors.deepRed,
        fontFamily:fontMedium,
        fontSize:fontSizes.small
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
        right:1,
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
    btnView:{
        marginTop:30,
        width:Dimensions.get('window').width-15,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    registerButton: {
        height:50,
        width:300,
        marginTop:20,
        marginBottom:20,
        backgroundColor:Colors.red,
        borderRadius:5,
        borderColor:Colors.white,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        textAlign:'center',
        color:Colors.white,
        padding:10,
        fontWeight:'bold',
        fontSize:fontSizes.medium,
        fontFamily:fontMedium
    }, 
    noItemsView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    noItemsText:{
        fontSize:fontSizes.large,
        fontFamily:fontRegular
    }
})