import React, { Component } from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
class index extends Component{
  render(){
    return(
     <div><App /></div> 
    )
  }
}
ReactDom.render(<App />,document.getElementById('root'));