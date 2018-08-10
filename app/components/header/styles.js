import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from '../../utils/colors';
// import * as appStyles from '../../styles/appStyles';
import {fontMedium,fontBold,fontRegular} from '../../styles/appStyles';
import * as fontSizes from '../../utils/fontSizes';

export default styles=StyleSheet.create({
    mainContainer: {
        flexDirection:'row',
        height:60,
        width:Dimensions.get('window').width, 
        backgroundColor:Colors.deepRed,
        alignContent:'center',
        top:0
    },
    backContainer: {
        width: '15%',
        alignItems:'center',
        paddingTop:17,
        // borderColor:'yellow',
        // borderWidth:1
    },

    titleContainer: {
        width:'70%',
        alignItems:'center',
        // borderColor:'blue',
        // borderWidth:1
    },
    rightContainer: {
        width:'15%',
        alignItems:'center',
        paddingTop: 17,
        // borderColor:'white',
        // borderWidth:1
    },
    text: {
        fontFamily:fontMedium,
        alignItems: 'center',
        fontSize: fontSizes.large,
        marginTop: 20,
        color: Colors.white,
    },
});