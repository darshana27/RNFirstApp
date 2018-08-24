import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
import * as fontSizes from '../../../utils/fontSizes';
import { fontMedium,fontBold,fontRegular } from '../../../styles/appStyles';
//import * as fontStyless from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container : {
        flex:1,
        // borderColor:'blue',
        // borderWidth:1,
    },
    itemDetails:{
        
        backgroundColor:Colors.white,
        width:Dimensions.get('window').width,
        //height:'22%',
        flexDirection:'row',
        // borderWidth:1,
        // borderColor:'red',  
        padding:10
    },
    leftContent:{
        width:Dimensions.get('window').width-90,
        // borderWidth:1,
        // borderColor:'black',  
    },
    rightContent:{
        width:'18.5%',
        // borderColor:'yellow',
        // borderWidth:1,
        alignContent:'flex-end',
        justifyContent: 'flex-end',
        paddingBottom:5
    },
    productHeading:{
        color:Colors.productDetailsHeading1,
        fontFamily:fontMedium,
        fontSize:fontSizes.large,
    },
    productCategory:{
        color:Colors.productHeading1,
        marginTop:5,
        fontFamily:fontRegular,
        fontSize:fontSizes.medium,
    },
    productProducer:{
        color:Colors.productHeading1,
        marginTop:5,
        fontFamily:fontRegular,
        fontSize:fontSizes.small
    },
    cardView:{
        alignContent:'center',
        width:Dimensions.get('window').width-22,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
       // height:'80%',
        borderRadius:10,
        backgroundColor:Colors.white,
        paddingTop:5
    },
    priceShare:{   
       //height:'15%', 
    //    borderWidth:1,
    //    borderColor:'red',
       flexDirection:'row',
       padding:10,
       
    },
    price:{
        left:0,
        width:'90%',
        fontSize:fontSizes.xLarge,
        color:Colors.productPrice,
        alignContent:'flex-start'
    },
    iconStyle:{
        right:0,
        width:'90%',
        color:Colors.lightGray,
        alignContent:'flex-end'
    },
    mainImg:{
        //height:'40%',
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
        // paddingLeft:100,
    },
    productImgs:{
       height:90,
        flexDirection:'row',
       
        // justifyContent:'space-between',
        paddingTop:5,
        borderBottomWidth:1,
        borderBottomColor:Colors.lightGray,
        paddingRight:10,
        paddingLeft:10,
        paddingBottom:5
    },
    img1:{
        height:'95%',
        width:'30%',
        borderWidth:2,
        borderRadius:5,
        borderColor:Colors.lightGray
    },
    imgBig:{
        height:140,
        width:180,
    },
    imgSmall:{
        height: 50,
        width:60,
    },
    productDesc:{
        //height:'30%',
        paddingTop:10,
        paddingRight:15,
        paddingLeft:15,
        paddingBottom:10
    },
    descHeading:{
        
        color:Colors.descHeading,
        fontFamily:fontMedium,
        fontSize:fontSizes.medium,
    },
    descText:{
        color:Colors.descContent,
        fontFamily:fontRegular,
        fontSize:fontSizes.medium,
    },
    buttons:{
        width:Dimensions.get('window').width,
        height:'12%',
        backgroundColor:Colors.white,
        flexDirection:'row',
        bottom:0,
        paddingTop:10,
        marginBottom:10,
        paddingLeft:20,
        paddingRight:20,
        marginTop:10,
        alignContent:'center',
        justifyContent:'space-between'
    },
    buyNowBtn:{
        backgroundColor:Colors.red,
        height:50,
        width:'45%',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    rateBtn:{
        backgroundColor:Colors.lightGray,
        height:50,
        width:'45%',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        color:Colors.white,
    },
    ModalView:{
        backgroundColor:Colors.white,
        height:'85%',
        width:'100%',
        borderRadius:10,
        alignItems:'center',
        paddingTop:20,      
    },
    ModalView2:{
        backgroundColor:Colors.white,
        height:'95%',
        width:'100%',
        borderRadius:10,
        alignItems:'center',
        paddingTop:20,      
    },
    modalRatingName:{
        fontSize:fontSizes.xxLarge,
        color:Colors.productHeading1,
        fontFamily:fontRegular,  
    },
    modalRatingImage:{
        marginTop:'5%',
        height:'50%',
        width:'70%',
    },
    starRating:{
        
        marginTop:20
    },
    modalBtn:{
        height:50,
        width:'80%',
        backgroundColor:Colors.red,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    },   
    modalText:{
        fontSize:fontSizes.xLarge,
        fontFamily:fontRegular,
        color:Colors.productDetailsHeading1,
    },
    modalTextInput:{
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        marginTop:5,
        height:40,
        width:80,
        borderWidth:1,
        borderRadius:2,
        borderColor:Colors.lightGray,
        textAlign:'center'
    },
    modalQtyBtn:{
        height:50,
        width:'60%',
        backgroundColor:Colors.red,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    },
    modalQtyImage:{
        
        marginTop:'5%',
        height:'90%',
        width:'100%',
        borderColor:Colors.lightGray,
    },
    modalImageView:{
        marginTop:'5%',
        padding:5,
        height:'50%',
        width:'80%',
        borderColor:Colors.lightGray,
        borderWidth:1,
        shadowOpacity: 0.8,

    },
    imageTO:{
        padding:3,
        height:70,
        width:80,
        borderWidth:1,
        borderColor:Colors.lightGray,
        marginLeft:10,
        alignItems:'center',
        justifyContent:'center'
    },
    modalBtnTxt:{
        color:Colors.white,
    },
    closeBtn:{
        height:30,
        width:'100%',
        alignContent:'flex-end',
        alignItems:'flex-end',
       
    },
    closeStyle:{
        right:10
    }
})