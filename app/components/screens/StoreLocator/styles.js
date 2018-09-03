import { StyleSheet,Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
import * as fontSize from '../../../utils/fontSizes';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.white
      },
      text:{
          fontSize:30,
          fontWeight:'bold',
      },
      mapView:{
          width:Dimensions.get('window').width,
          height:220,
      },
      map:{
        ...StyleSheet.absoluteFillObject,
      },
      itemContainer : {  
        width:'100%',
        flexDirection:'row',
        padding:5,
        height:80,
        // borderBottomColor:Colors.productHeading1,
        // borderBottomWidth:1,
        backgroundColor:'#ffffff',
        // borderColor:'yellow',
        // borderWidth:1
      },
      productImage:{
        paddingLeft:6,
        height:'100%',
        width:'10%',
        alignContent:'center',
        justifyContent:'center',
    },
      productDetails:{
        height:'100%',
        width:Dimensions.get('window').width-52,
        paddingLeft:10,
        alignContent:'flex-start',
        justifyContent:'center',
    },
    item:{
        fontSize:fontSize.large,
        color:Colors.descContent,
        fontFamily:fontMedium
    },
    producer:{
        fontSize:fontSize.small,
        color:Colors.productHeading1,
        fontFamily:fontRegular
    },
    price:{
        marginTop:5,
        color:Colors.productPrice,
        fontSize:fontSize.xLarge,
        fontFamily:fontRegular
    },
    addressView:{
        height:Dimensions.get('window').height-300,
    }

})