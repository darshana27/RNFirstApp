import { StyleSheet,Dimensions } from 'react-native';
import * as Colors from '../../../utils/colors';

export default styles=StyleSheet.create({

    header:{
        top:0,
        left:0,
        right:0,
    },
    viewSwiper:{

        height:'32%',
        width:'100%',
    },
    slides:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        
    },
    slideImages:{
        width: '100%',
        height:'100%'
    },
    cards:{
        height:Dimensions.get('window').height-'32%',
        width:Dimensions.get('window').width
    },
    cardRow:{
        paddingTop:'1%',
        paddingBottom:'1%',
        height:'39%',
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',

    },
    cardTable:{
     
        marginRight:8,
        marginLeft:8,
        height:'83%',
        width:'43%',
        backgroundColor: Colors.red,
        justifyContent:'flex-end',
        alignItems:'flex-start' 
    },
    cardSofa:{
        
        marginRight:8,
        marginLeft:8,
        height:'83%',
        width:'43%',
        backgroundColor: Colors.red,
        justifyContent:'flex-start',
        alignItems:'flex-end' 
    },
    cardChair:{
       marginBottom:40,
        marginRight:8,
        marginLeft:8,
        height:'83%',
        width:'43%',
        backgroundColor: Colors.red,
        justifyContent:'flex-end',
        alignItems:'flex-end' 
    },
    cardCupboard:{
        marginBottom:40,
        marginRight:8,
        marginLeft:8,
        height:'83%',
        width:'43%',
        backgroundColor: Colors.red,
        justifyContent:'flex-start',
        alignItems:'flex-start' 
    },
    tableImg:{
        height:'50%',
        width:'60%',
        left:10,
        bottom:10,
        color:Colors.white,
        textShadowColor: '#333333',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 5
    },
    sofaImg:{
        height:'50%',
        width:'60%',
        top:10,
        right:2,
        color:Colors.white,
        textShadowColor: '#333333',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 5
    },
    chairImg:{
        height:'60%',
        width:'50%',
        right:12,
        bottom:2,
        color:Colors.white,
        textShadowColor: '#333333',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 5
    },
    cupboardImg:{
        top:10,
        left:10,
        height:'65%',
        width:'50%',
        color:Colors.white,
        textShadowColor: '#333333',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 5},
    tablesTxt:{color:Colors.white,fontSize:22,fontWeight:'bold',marginLeft:'40%',marginBottom:'23%'},
    chairTxt:{color:Colors.white,fontSize:22,fontWeight:'bold',marginRight:'45%',marginBottom:'10%'},
    cupboardTxt:{color:Colors.white,fontSize:22,fontWeight:'bold',marginLeft:'10%',marginTop:15},
    SofaTxt:{color:Colors.white,fontSize:22,fontWeight:'bold',marginRight:'50%',marginTop:30}
})