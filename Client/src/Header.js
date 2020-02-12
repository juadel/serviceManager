import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Customers from  './Components/Customer/Customers'
import GetServicebyID from './Components/Services/GetServicebyId';
import Services from './Components/Services/Services';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import {Nav, Navbar, Form, FormControl} from 'react-bootstrap';
import { Authenticator, Greetings } from 'aws-amplify-react';
import './App.css';


class Header extends React.Component{

  
    state ={
        searchText: "",
    };
    
  handleRoute = route => () => {
      this.props.history.push({ pathname: route });
    };
  
  
  handleSearchSubmit = () => {
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
    this.setState({
      searchText: event.target.value
    });
  };

  render(){
    return(
      
        <div>
          <Navbar bg="light" variant="light">
              <Navbar.Brand>
                <a href='http://www.juadel.com'>SERVICE MANAGER</a>
              </Navbar.Brand> 
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.handleRoute("/Dashboard")}>Dashboard</Nav.Link>
              <Nav.Link onClick={this.handleRoute("/Services")}>Services</Nav.Link>
              <Nav.Link onClick={this.handleRoute("/Customers")}>Customers</Nav.Link>
            </Nav>
            <Form inline  >
              <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.searchText} onChange={this.handleSearchInput}/>
              <Button className="btn-search" variant="outline-info" onClick={this.handleSearchSubmit} >Search</Button>
            </Form>
            </Navbar.Collapse>
            <Authenticator hideDefault={true}><Greetings inGreeting={(username) => 'Hello ' + username} /></Authenticator>
          </Navbar>
          <Switch>
            <Route path="/Dashboard" component= {Dashboard}/>
            <Route path="/Services" component= {Services}/>
            <Route path="/Customers" component= {Customers}/>
            <Route path="/Results" component={GetServicebyID}/>
            
          </Switch>
          
        </div>
      
    )
  
  
  }
}
export default withRouter(Header);

class Dashboard extends Component{
    render(){
      return(
        <div>
          Dashboard
        </div>
      )
    }
  }
  
  