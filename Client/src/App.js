import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Customer from  './Components/Customer/Customers'
import Service from './Components/Services/GetServicebyId';
import Sidebar from './Components/Sidebar';
import Amplify from 'aws-amplify';
import cognito from './Auth/Cognito';
import { withAuthenticator, Authenticator, Greetings } from 'aws-amplify-react';
import './App.css';


Amplify.configure(cognito);

  

class App extends Component {
  

  render(){
  return (
    <div>
      
      

      <div className="App">
      
          <div className="grid-container">
          <Sidebar clasName="grid-sidebar" />
            
          
          <div className="header" >
            <Authenticator hideDefault={true}>
                <Greetings inGreeting={(username) => 'Hello ' + username} outGreeting="Welcome to Service Manager, Please sign in or Register..."/>
            </Authenticator>
          </div>
          
          <div className="content"><Service serviceid="6"/></div>
        </div>
       
      </div>
      
        
      
      
    </div>
  );
}
}

export default withAuthenticator(App, false);
