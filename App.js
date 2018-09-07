import React, {Component} from 'react';
import Main from './app/root/main';

export default class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
   return (
        <Main/>
    );
  }
}