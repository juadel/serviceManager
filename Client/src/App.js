import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Customers from  './Components/Customer/Customers'
import Service from './Components/Services/GetServicebyId';
import Services from './Components/Services/Services';
//import Sidebar from './Components/Sidebar';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {Nav, Navbar, NavItem, Form, FormControl} from 'react-bootstrap';
import Amplify from 'aws-amplify';
import cognito from './Auth/Cognito';
import { withAuthenticator, Authenticator, Greetings } from 'aws-amplify-react';
import './App.css';


Amplify.configure(cognito);

  

class App extends Component {
  
  

  render(){
  return (
    <div>
      <Header>
      
      </Header>
    </div>
  );
}
}
export default withAuthenticator(App, false);


class Header extends Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Navbar bg="light" variant="light">
              <Navbar.Brand>
                <a href='http://www.juadel.com'>SERVICE MANAGER</a>
              </Navbar.Brand> 
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/Services">Services</Nav.Link>
              <Nav.Link href="/Customers">Customers</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button className="btn-search" variant="outline-info" >Search</Button>
            </Form>
            </Navbar.Collapse>
            <Authenticator hideDefault={true}><Greetings inGreeting={(username) => 'Hello ' + username} /></Authenticator>
          </Navbar>
          <Switch>
            <Route path="/Dashboard" component= {Dashboard}/>
            <Route path="/Services" component= {Services}/>
            <Route path="/Customers" component= {Customers}/>
          </Switch>
          
        </div>
      </BrowserRouter>
    )
  }
}


class Dashboard extends Component{
  render(){
    return(
      <div>
        Dashboard
      </div>
    )
  }
}


