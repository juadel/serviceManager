import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Nav, Navbar, Form, FormControl, Col} from 'react-bootstrap';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';

const ServiceStyle = styled.div` 
    display: block;            
    width: 900px;
    height: 800px;
    margin: 16px ;
    border: 1px solid #DCDCDC;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    word-wrap: break-word;
    overflow: auto;                    
                  
    `;

    const CustomerStyle = styled.div` 
    display: block;            
    width: 900px;
    height: 800px;
    margin: 16px ;
    border: 1px solid #DCDCDC;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    word-wrap: break-word;
    overflow: auto;  
    
    top: 108px;
    right: 2px;                  
                  
    `;

class Services extends Component{

    constructor(props){
        super(props);
        this.state={
            chkNewCustomer: false,
            Customer : {CustomerName: "", SiteNumber:"", Address:"", City:"", Province:"",PostalCode:"", ContactName:"", Phone:""},
            Service : []

        };

    }

    handleChk = () =>{
       if (this.state.chkNewCustomer===false){
        this.setState({chkNewCustomer : true});
       } else{
        this.setState({chkNewCustomer : false});
       }

    }

    handleCustomerSubmit =() =>{
        //console.log(this.state.Customer)


    }
    handleCustomerImput = event => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({Customer:{[name] : value }});
        console.log(this.state.Customer)
        
    }

    render() {
        
        let butText =""
        if (this.state.chkNewCustomer){
            butText = "Submit";
        } else {
            butText = "Search";
        }
        
        return (
            <div>
                <div>Create new Ticket</div>
                <ServiceStyle>
                <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTtitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="Title" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPrioritty">
                    <Form.Label>Priority Level</Form.Label>
                    <Form.Control as="select" >
                        <option>Normal (5 days)</option>
                        <option>Level 1 (3 days)</option>
                        <option>Level 2 (next day)</option>
                        <option>Critical Level (5 hours)</option>
                    </Form.Control> 
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select">
                        <option>Create</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="10" placeholder="Enter a brief description for this ticket" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
                </Form>
                </ServiceStyle>

                <CustomerStyle>
                <Form onSubmit ={this.handleCustomerSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="CustomerName" >
                    <Form.Label>Customer</Form.Label>
                    <Form.Control type="text" placeholder="Select Customer" onChange = {this.handleCustomerImput} name="CustomerName"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="SiteNumber">
                    <Form.Label>Site Number:</Form.Label>
                    <Form.Control type="Site" placeholder="Site Number" onChange = {this.handleCustomerImput} name="SiteNumber"/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" onChange = {this.handleCustomerImput} name="Address" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="City">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange = {this.handleCustomerImput} name="City"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Province">
                    <Form.Label>Province</Form.Label>
                    <Form.Control as="select" onChange = {this.handleCustomerImput} name="Province">
                        <option>Choose...</option>
                        <option>Alberta</option>
                        <option>British Columbia</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="PostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control onChange = {this.handleCustomerImput} name="PostalCode"/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="ContactName">
                        <Form.Label>Contact Name:</Form.Label>
                        <Form.Control placeholder="Name:" onChange = {this.handleCustomerImput} name="ContactName"/> 
                    </Form.Group>
                    <Form.Group as={Col} controlId="Phone">
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control placeholder="Phone Number" onChange = {this.handleCustomerImput} name="Phone"/> 
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="New Customer" onClick= {this.handleChk} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    {butText}
                </Button>
                </Form>
                </CustomerStyle>
            </div>
        )
    }

}

export default Services; 