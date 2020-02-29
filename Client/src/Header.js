import React, {Component} from 'react';
import {Button, Container} from 'react-bootstrap';
import styled from 'styled-components';
import Customers from  './Components/Customer/Customers'
import GetItembyID from './Components/Services/GetItembyId';
import Services from './Components/Services/Services';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import {Nav, Navbar, Form, FormControl, Row, Col} from 'react-bootstrap';
import { Authenticator, Greetings } from 'aws-amplify-react';

import './App.css';


const AuthStyle = styled.div`
    width: 300px;
    margin: 10px ;
   `;
  

class Header extends React.Component{

  
    state ={
        searchText: "",
    };
    
  handleRoute = route => () => {
      this.props.history.push({ pathname: route })
      
    };
  
  
  handleSearchSubmit = (event) => {
      
      if (this.state.searchText) {
        
        this.props.history.push({
          pathname: "/results",
          state: {
            searchText: this.state.searchText
          }
          
        });
        
      } else {
        alert("Please enter a Ticket Number");
      }
      
    };

  
  handleSearchInput = event => {

    this.setState({searchText: event.target.value})
    console.log(event.target.value)
        
  }
  handleEnter = event =>{
    console.log(event.key)
    if (event.key === "Enter"){
      event.preventDefault();
      this.handleSearchSubmit();
    }
  }
 
  
 

  render(){
    
    return(
      <Row>
        <Container>
          
          <Navbar bg="light" variant="light">
          
            <Navbar.Brand>
              <a href='https://www.juadel.com'>SERVICE MANAGER</a>
            </Navbar.Brand> 
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link onClick={this.handleRoute("/Dashboard")}>Dashboard</Nav.Link> */}
              <Nav.Link onClick={this.handleRoute("/Services")}>New Service</Nav.Link>
              {/* <Nav.Link onClick={this.handleRoute("/Customers")}>Customers</Nav.Link> */}
            </Nav>
            </Navbar.Collapse>
            
            
            <Form inline>
              <FormControl type="text" placeholder="Ticket Number" className="mr-sm-2" value={this.state.searchText} onChange={this.handleSearchInput} onKeyPress={this.handleEnter}  />
              <Button className="btn-search" variant="outline-info" onClick={this.handleSearchSubmit}>Search</Button> 
            </Form>
            
          
                 
            <AuthStyle><Authenticator hideDefault={true}><Greetings inGreeting={(username) => 'Hello ' + username} /></Authenticator></AuthStyle>
            
          </Navbar>
          <Switch>
            {/* <Route path="/Dashboard" component= {Dashboard}/> */}
            <Route path="/Services" component= {Services}/>
            {/* <Route path="/Customers" component= {Customers}/> */}
            <Route path="/Results" component={GetItembyID}/>
         </Switch>
        </Container>
        </Row>
          
      
    )
  
  
  }
}
export default withRouter(Header);

class Dashboard extends Component{
    render(){
      return(
        <div>
          jυadel
        </div>
      )
    }
  }
  
  