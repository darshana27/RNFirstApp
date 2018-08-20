import { StyleSheet } from 'react-native';
import * as Colors from '../../../utils/colors';
// import * as appStyles from '../../../styles/appStyles';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';
export default styles=StyleSheet.create({
    viewStyle:{
        flex:1,
        // backgroundColor: Colors.red,
        justifyContent:'center',
        alignItems:'center'
    },
    headingText: {
        color:Colors.white,
        fontWeight:'bold',
        fontSize:43,
        paddingBottom:'8%',
        fontFamily:'Gotham'
    },
    inputBox: {
        height:45,
        width:'70%',
        color:Colors.white,
        fontSize:20,
        fontFamily:fontRegular
         // borderBottomColor:Colors.white,
        // borderTopColor:Colors.white,
        // borderLeftColor:Colors.white,
        // borderRightColor:Colors.white,
        // borderBottomWidth:1,
        // borderTopWidth:1,
        // borderLeftWidth:1,
        // borderRightWidth:1,
        // placeholderTextColor:'white',
    },
    loginButton: {
        height:45,
        width:'80%',
        marginTop:'7%',
        backgroundColor:Colors.white,
        borderRadius:5,
        borderColor:Colors.white,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        textAlign:'center',
        color:Colors.red,
        padding:'3%',
        fontWeight:'bold', 
        
        fontSize:22,
        height:50,
        fontFamily:fontMedium

    },
    textLink:{
        fontSize:19,
        color:Colors.white,
        marginTop:10,
        fontWeight:'bold',
        fontFamily:fontBold
    }, 
    nestedView: {
        flexDirection: 'row',
        // backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.white,
        height: 45,
        borderRadius: 5 ,
        margin: '2.3%',
        width:'80%',
    },
    iconStyle: {
        paddingTop: 10,
        marginLeft: 13,
        height: 45,
        width: '10%',
        alignItems: 'center',
    },

    footer:{
        alignItems:'center',
        marginTop:60,
        position:'absolute',
        bottom:3,
        left:5,
        width:'90%',
        flexDirection:'row',
        alignSelf:'baseline',
        // borderWidth:1,
        // borderColor:'yellow'
    },
    endText:{
        color:Colors.white,
        fontSize:15,
        fontWeight:'bold',
        left:6,
        fontFamily:fontMedium,
        // borderColor:'green',
        // borderWidth:1,
        width:'90%'
    },
    registerView:{
        width:'8%',
        padding:1
        
    },
    addIcon: {
        backgroundColor:Colors.deepRed,
        // textAlign:'center',
        // backgroundColor:Colors.deepRed,
        // marginLeft:120,
        alignItems:'center',
        justifyContent:'center',
        right:2,
        bottom:3,
        width:'20%',
        paddingTop:8.5,
        paddingBottom:7.5,
        paddingLeft:14.5,
        paddingRight:13,
        color:Colors.white,
        height:50,
        width:60,
        // borderColor:'blue',
        // borderWidth:1
        // justifyContent:'center',
    },
    backgroundImage:{
        flex:1,
        height:null,
        width:null,
        // resizeMode: 'cover'
    }
});