import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Customer from  './Components/Customer/Customers'
import Service from './Components/Services/GetServicebyId';
import Sidebar from './Components/Sidebar';
import Amplify from 'aws-amplify';
import cognito from './Auth/Cognito';
import { withAuthenticator, Authenticator, Greetings } from 'aws-amplify-react';
import './App.css';
import styled from 'styled-components';

Amplify.configure(cognito);

  

class App extends Component {
  

  render(){
  return (
    <div>
      
      <Authenticator hideDefault={true}>
        <Greetings 
        inGreeting={(username) => 'Hello ' + username}
        outGreeting="Welcome to Service Manager, Please sign in or Register..."
        />
        
      </Authenticator>

      <div clasName="App"> <Sidebar >
      
      </Sidebar>
      </div>
      <Service serviceid="1"/>
        
      
      
    </div>
  );
}
}

export default withAuthenticator(App, false);
