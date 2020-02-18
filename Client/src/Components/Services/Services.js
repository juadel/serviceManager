import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Nav, Navbar, Form, FormControl, Col} from 'react-bootstrap';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';
import  apiEndpoint  from '../../Config/backendConfig';

const ServiceStyle = styled.div` 
    display: block;            
    width: 900px;
    height: 800px;
    margin: 16px ;
    border: 1px solid #DCDCDC;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    position: absolute;
    word-wrap: break-word;
    overflow: auto;
    top: 108px;
    right: 2px;                    
                  
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
    
                      
                  
    `;
    //

class Services extends Component{

    constructor(props){
        super(props);
        this.state={
            chkNewCustomer: false,
            CustomerName: "", SiteNumber:"", Address:"", City:"", Province:"",PostalCode:"", ContactName:"", Phone:"", CustomerID:"",
            Title: "", Description:"", Status:"", PriorityLevel:"", CreatedBy:"", 
            jwtToken:"",
            CustomMessage:"",
            user:""


        };

    }

    handleChk = () =>{
       if (this.state.chkNewCustomer===false){
        this.setState({chkNewCustomer : true});
       } else{
        this.setState({chkNewCustomer : false});
       }

    }

    handleCustomerSubmit =event =>{
        //console.log(this.state.Customer);
        const newCustomer = {
            CustomerName: this.state.CustomerName,
            SiteNumber : this.state.SiteNumber,
            Address: this.state.Address,
            City: this.state.City,
            Province: this.state.Province,
            Phone: this.state.Phone,
            PostalCode: this.state.PostalCode,
            ContactName: this.state.ContactName
           }
        this.createItem(newCustomer,"customer");
        event.preventDefault();
        
    }

    handleServiceSubmit = event =>{
        const newService= {
            CustomerID: this.state.CustomerID,
            Title: this.state.Title, 
            Description: this.state.Description,
            Status: this.state.Status, 
            PriorityLevel: this.state.PriorityLevel, 
            CreatedBy: this.state.user
        }
        this.createItem(newService,"service");
        
    }

    handleImput = event => {
        this.handleAuth();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({[name] : value });
    }
    
    
    async handleAuth (){
        const token = new getToken();
        await token.token()
        this.setState({
            user: token.state.user, 
            jwtToken: token.state.jwtToken
        })  
    } 
    
    async createItem(NewItem, type ){
        
        console.log(NewItem);
        await axios.post(apiEndpoint+'/item?item='+type, 
                        NewItem,
                        {headers: 
                            { 'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.state.jwtToken}`}
                        }
                            ).then(res => {
                                if (type==="customer"){
                                this.setState({CustomerID:res.data.item.CustomerID, CustomMessage: "Customer has been Created."})
                                ;console.log(res.data.item.CustomerID)
                                }else {
                                     this.setState({CustomMessage: "Service has been Created."})
                                }
                            })
                            .catch(e => {alert("Customer not created",e); console.log(e)});
        
        //window.location ="/Services";
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
                <CustomerStyle>
                <Form onSubmit ={this.handleCustomerSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="CustomerName" >
                    <Form.Label>Customer</Form.Label>
                    <Form.Control type="text" placeholder="Select Customer" onChange = {this.handleImput} name="CustomerName"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="SiteNumber">
                    <Form.Label>Site Number:</Form.Label>
                    <Form.Control type="Site" placeholder="Site Number" onChange = {this.handleImput} name="SiteNumber"/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" onChange = {this.handleImput} name="Address" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="City">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange = {this.handleImput} name="City"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Province">
                    <Form.Label>Province</Form.Label>
                    <Form.Control as="select" onChange = {this.handleImput} name="Province">
                        <option>Choose...</option>
                        <option>Alberta</option>
                        <option>British Columbia</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="PostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control onChange = {this.handleImput} name="PostalCode"/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="ContactName">
                        <Form.Label>Contact Name:</Form.Label>
                        <Form.Control placeholder="Name:" onChange = {this.handleImput} name="ContactName"/> 
                    </Form.Group>
                    <Form.Group as={Col} controlId="Phone">
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control placeholder="Phone Number" onChange = {this.handleImput} name="Phone"/> 
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="New Customer" onClick= {this.handleChk} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    {butText}
                </Button>
                </Form>
                <div> {this.state.CustomerMessage}</div>
                <div> {this.state.CustomerID}</div>
                </CustomerStyle>
                <div>Create new Ticket</div>
                <ServiceStyle>
                
                <Form onSubmit ={this.handleServiceSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTtitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="Title" name="Title" onChange = {this.handleImput}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPrioritty">
                    <Form.Label>Priority Level</Form.Label>
                    <Form.Control as="select" name="PriorityLevel" onChange = {this.handleImput}>
                        <option>...Choose</option>
                        <option>Normal (5 days)</option>
                        <option>Level 1 (3 days)</option>
                        <option>Level 2 (next day)</option>
                        <option>Critical Level (5 hours)</option>
                    </Form.Control> 
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="Status" onChange = {this.handleImput}>
                        <option>...Choose</option>
                        <option>Create</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="10" placeholder="Enter a brief description for this ticket" name="Description" onChange = {this.handleImput}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
                </Form>
                </ServiceStyle>

                
            </div>
        )
    }

}

export default Services; 