import { StyleSheet,Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
import * as fontSize from '../../../utils/fontSizes';
// import * as appStyles from '../../../styles/appStyles';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    mainView:{
        backgroundColor:Colors.white,
        height:Dimensions.get('window').height
    },
    shippingText:{
        top:15,
        fontFamily:fontRegular,
        left:10,
        fontSize:fontSize.xLarge,
        color:Colors.descContent
    },
    itemRow:{
        margin:7,
        top:15,
        flexDirection:'row',
        height:100,
    },
    radioView:{
        width:43,
        justifyContent:'center',
        alignItems:'center'
    },
    radioButton:{
        height:15,
        width:15,
        borderRadius:50,
        borderWidth:3,
        borderColor:Colors.addressListRadioOuter
    },
    userName:{
        fontSize:fontSize.xLarge,
        fontFamily:fontMedium,
        color:Colors.descContent
    },
    addressView:{
        padding:5,
        width:297,
        borderWidth:1,
        borderColor:Colors.addressListRadioOuter,
        borderRadius:5
    },
    addressText:{
        marginTop:5,
        color:Colors.descContent,
        fontSize:fontSize.medium,
        fontFamily:fontRegular
    },
    closeView:{
        height:10,
        width:'100%',
        alignItems:'flex-end',
        
    },
    btnView:{
        alignItems:'center',justifyContent:'center'
    },
    orderBtn: {
        height:45,
        width:335,
        marginTop:60,
        backgroundColor:Colors.red,
        borderRadius:5,
        borderColor:Colors.white,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    btnText:{
        color:Colors.white,
        fontFamily:fontMedium,
        fontSize:fontSize.large
    },
    shippingTitleView:{
        height:50,
        borderBottomWidth:1,
        borderBottomColor:Colors.addressListRadioInner
    }
}
)