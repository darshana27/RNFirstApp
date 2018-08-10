import React, { Component } from 'react';


var fetchApi = {};
exports.fetchApi = function() {
    return fetchApi;
};

fetchApi.fetchData=function(url,data,callbackFn){
    fetch(url,{data})
    .then(response => response.json())
    .then(response => {callbackFn!=null?callbackFn(response):null})
}