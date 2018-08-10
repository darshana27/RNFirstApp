import { StyleSheet } from 'react-native';
import * as Colors from '../utils/colors';

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
        fontSize:25,
    },
    UserEmail:{
        color:Colors.white,
        fontSize:16
    },
    icon:{
        marginLeft:10,
        height:20,
        width:20,
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

})