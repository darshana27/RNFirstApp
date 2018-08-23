import { StyleSheet,Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
import * as fontSize from '../../../utils/fontSizes';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';
import { Col } from 'native-base';

export default styles=StyleSheet.create({
    viewStyle:{
        height:Dimensions.get('window').height-80,
        padding:15,
        backgroundColor:Colors.addAddressBG,
    },
    textArea:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:-10,
        height:100,
        width:Dimensions.get('window').width-35,
        backgroundColor:Colors.white,
        color:Colors.descContent,
    },
    cityInput:{
        width:Dimensions.get('window').width-35,
        marginTop:-10,
        height:40,
        backgroundColor:Colors.white,
    },
    smallInput:{
        margin:5,
        marginTop:-10,
        height:40,
        backgroundColor:Colors.white,
        width:Dimensions.get('window').width-210,
        backgroundColor:Colors.white,
        color:Colors.descContent,
    },
    text:{
        // top:10,
        marginTop:15,
        height:40,
        // backgroundColor:Colors.addAddressBG,
        color:Colors.descContent,
        fontFamily:fontRegular,
        fontSize:fontSize.large
    },
    rowView:{
        flexDirection:'row',
        // backgroundColor:Colors.addAddressBG
    },
    colView:{
        flexDirection:'column',
        // backgroundColor:'#DBDCD5'
    },
    btnAddAddress:{
        borderRadius:5,
        marginTop:30,
        height:50,
        width:Dimensions.get('window').width-35,
        backgroundColor:Colors.red,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:Colors.white,
        fontFamily:fontRegular,
        fontSize:fontSize.large,
        
    }
})