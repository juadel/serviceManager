import React, {Component} from 'react';
import Amplify from 'aws-amplify';
import cognito from './Auth/Cognito';
import {BrowserRouter} from 'react-router-dom';
import { withAuthenticator, Authenticator, Greetings } from 'aws-amplify-react';
import Header from './Header';
import './App.css';


Amplify.configure(cognito);

  

class App extends Component {
  
  

  render(){
  return (
    <div>
      <BrowserRouter>
      <Header>
      
      </Header>
      </BrowserRouter>
    </div>
  );
}
}
export default withAuthenticator(App, false);



