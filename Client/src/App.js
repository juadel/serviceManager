import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Customer from  './Customer/Customers';
import Services from './Services/Services';
import './App.css';

class App extends Component {
  render(){
  return (
    <div>
      <h1>
        Welcome to Service Manager
      </h1>
      <h2>
        Please log in to access <Button>Login</Button>
      </h2>
    </div>
  );
}
}

export default App;
