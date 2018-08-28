import { StyleSheet,Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';
// import * as appStyles from '../../../styles/appStyles';
import {fontMedium,fontBold,fontRegular} from '../../../styles/appStyles';

export default styles=StyleSheet.create({
    container: {
        flex: 1,

      },
      text:{
          fontSize:30,
          fontWeight:'bold',
      },
      mapView:{
          width:Dimensions.get('window').width,
          height:220,
          borderColor:'cyan',
          borderWidth:1
      },
      map:{
        ...StyleSheet.absoluteFillObject,
      }
})