import { StyleSheet,Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
import * as fontSize from '../../../utils/fontSizes';
// import * as appStyles from '../../../styles/appStyles';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';
export default styles=StyleSheet.create({
    viewStyle:{
        flex:1,
        // backgroundColor: Colors.red,
        justifyContent:'center',
        alignItems:'center',
    },
    roundedImage:{
        borderRadius:50,
        height:100,
        width:100,
        top:40
    },
    header:{
        top:0,
        left:0,
        right:0,
    },
    headingText: {
        color:Colors.white,
        fontWeight:'bold',
        fontSize:38,
        letterSpacing:1,
        paddingBottom:11,
        marginTop:17,
    },
    inputArea: {height: 38, width: '80%', fontSize: 16, color: Colors.white},
    inputBox: {
        height: 45,
        width:'80%',
        fontSize:16,
        color:Colors.white,
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
    registerButton: {
        height:50,
        width:300,
        marginTop:20,
        marginLeft:13,
        marginBottom:20,
        backgroundColor:Colors.white,
        borderRadius:5,
        borderBottomColor:Colors.white,
        borderTopColor:Colors.white,
        borderLeftColor:Colors.white,
        borderRightColor:Colors.white,
        borderWidth:1,
    },
    btnText:{
        textAlign:'center',
        color:Colors.red,
        padding:10,
        fontWeight:'bold',
        fontSize:22,
        fontFamily:fontMedium
    }, 
    nestedView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.white,
        height: 40,
        margin: 10,
        padding:5,top:10,
    },    
    iconStyle: {
        paddingTop: 11.5,
        marginLeft:2,
        height: 45,
        width: '10%',
    },
    viewRadio: {

        flexDirection:'row',
        justifyContent:'center', 
        marginTop:5,
    },
    text:{
        fontSize:18,
        color:Colors.white,
        marginRight:20,
        fontFamily:fontMedium
    },
    viewCheck: {
        backgroundColor:Colors.red,
        
    },
    checkBox:{
        borderWidth:0,
        backgroundColor:Colors.red,
    },
    textStyle:{
        color:Colors.white,
        fontFamily:fontMedium
    },
    backgroundImage:{
        flex:1,
        height:null,
        width:null,
        // resizeMode: 'cover'
    },
    resetPasswordBtn:{
        width:Dimensions.get('window').width,
        height:55,
        // color:Colors.descContent,
        backgroundColor:Colors.white,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'3%',
        bottom:0
    },
    resetPassword:{
        marginTop:'3%',
        fontFamily:fontMedium,
        fontSize:fontSize.medium,
    }
});