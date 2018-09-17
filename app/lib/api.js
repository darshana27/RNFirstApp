import React, { Component } from 'react';
import {Alert,AsyncStorage,BackHandler} from 'react-native';


var fetchApi = {};
exports.fetchApi = function() {
    return fetchApi;
};

 fetchApi.fetchData=function(url,method,headers,data,callbackFn){
    
    console.log("Fetch function");
    var options={method:method}

    AsyncStorage.getItem('user_access_token').then((value) => {
    console.log(value)   
        value!=null ? headers["access_token"]=value : null
        headers!== null ? options["headers"]=headers : null;
        data !==null ? options["body"]=data : null;    
        try{
            fetch(url,options)
            .then(response => response.json())
            .then(response => {
                // console.log(response)  
                callbackFn!=null?callbackFn(response):response.data})
            .catch((err) => alert(err)
            // Alert.alert(
            //     'Exit App',
            //     'No Internet Connection', [{
            //         text: 'Exit App',
            //         onPress: () => BackHandler.exitApp(),
            //         style: 'cancel'
            //     }, {
            //         text: 'Try Again',
            //         onPress: () => this.componentDidMount()
            //     }, ], {
            //         cancelable: false
            //     }
            // ) 
        )               
        }
        catch(err){
            Alert.alert("Something went wrong.Try again.")
        }}
    )
}
       