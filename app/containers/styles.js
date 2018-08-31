import { StyleSheet } from 'react-native';
import * as Colors from '../utils/colors';
import * as fontSize from '../utils/fontSizes';
export default styles=StyleSheet.create({
    mainView:{
        height:'100%',
        backgroundColor:'#222222',
    },
    header:{
        marginTop:40,
        height:150,
        alignItems:'center',
        justifyContent:'center'
    },
    roundedImage:{ 
        height:90,
        width:90,
        borderRadius:45,
        borderWidth:5,
        borderColor:Colors.white
    },
    container: {
        marginTop:0,
        height:60,
        paddingBottom:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    Username:{
        marginTop:7,
        color:Colors.white,
        fontSize:fontSize.medium,
    },
    UserEmail:{
        color:Colors.white,
        fontSize:fontSize.small
    },
    icon:{
        marginLeft:10,

    },
    item:{
        marginLeft:10,
        fontWeight:'bold',  
        color:Colors.white,
    },
    badge:{
        backgroundColor:Colors.red,
        height:10,
        marginLeft:60,
        fontSize:20
    },
    badgeView:{
        left:110,
    }

})