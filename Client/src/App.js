import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Customer from  './Customer/Customers';
import Service from './Services/GetServicebyId';
import Amplify from 'aws-amplify';
import cognito from './Auth/Cognito';
import { withAuthenticator, Authenticator, Greetings } from 'aws-amplify-react';
import './App.css';

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
      <h1>
        Welcome to Service Manager
        <Service/>
      </h1>
      <h2>
    
      </h2>
    </div>
  );
}
}

export default withAuthenticator(App, false);
