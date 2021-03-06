import { StyleSheet } from 'react-native';
import * as Colors from '../../../utils/colors';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';
import * as fontSize from '../../../utils/fontSizes';

export default styles=StyleSheet.create({
    viewStyle:{
        backgroundColor: Colors.red,
        justifyContent:'center',
        alignItems:'center'
    },
    header:{
        top:0,
        left:0,
        right:0,
    },
    headingText: {
        fontFamily:fontMedium,
        color:Colors.white,
        fontWeight:'bold',
        fontSize:38,
        letterSpacing:1,
        paddingBottom:11,
        marginTop:17,
    },
    inputBox: {
        height:45,
        width:'80%',
        fontSize:fontSize.large,
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
    nestedView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.white,
        height: 40,
        margin: 10,
        padding:5,
    },    
    iconStyle: {
        paddingTop: 11,
        marginLeft: 3,
        height: 45,
        width: '10%',
    },
    resetButton: {
        height:50,
        width:300,
        marginTop:20,
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
        fontSize:fontSize.xxLarge,
        fontFamily:fontMedium
    },
})