import React, {Component} from 'react';
import {Button, Card} from 'react-bootstrap';
import {Nav, Navbar, Form, FormControl, Col, Table, Modal} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';
import  apiEndpoint  from '../../Config/backendConfig';


const ServiceStyle = styled.div` 
    display: block;            
    width: 900px;
    
    margin: 16px ;
    border: 1px solid #DCDCDC;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    position: absolute;
    word-wrap: break-word;
    overflow: auto;              
                  `;

    

class Services extends Component{

    constructor(props){
        super(props);
        this.state={
            chkNewCustomer: false,
            CustomerName: "", SiteNumber:"", Address:"", City:"", Province:"",PostalCode:"", ContactName:"", Phone:"", CustomerID:"",
            Title: "", Description:"", Status:"", PriorityLevel:"", CreatedBy:"", 
            jwtToken:"",
            CustomMessage:"",
            user:"",
            customerSearchlst: null,
            modalShow: false


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
        
        if (this.state.chkNewCustomer){
        
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
        } else {
            this.searchCustomer(this.state.CustomerName);
            event.preventDefault();




        }
        
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
        event.preventDefault();
        
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
                                    console.log(res.data.item.ServiceID);
                                    this.setState({CustomMessage: "Service has been Created."});
                                    this.props.history.push({
                                        pathname: "/results",
                                        state: {
                                          searchText: res.data.item.ServiceID
                                        }});
                                    //window.location ="/Results";
                                    
                                }
                            })
                            .catch(e => {alert("Customer not created, it might already exists",e); console.log(e)});
        
        
    }

    async searchCustomer(CustomerName){
       // console.log(CustomerName)
        await axios.get(apiEndpoint+'/customername/'+CustomerName,  
        
                {headers: 
                    { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.jwtToken}`}
                }).then(res => {this.setState({customerSearchlst: res.data.customer, modalShow: true}); console.log(res.data.customer)})
                  .catch(e => console.log(e))


    }
    
    showCustomerSearch(){
        
        let customerLst= this.state.customerSearchlst;
        const lstOfCustomers = customerLst.map((customer) =>
                
                <tr className='clickable-row' onClick={() => this.chooseCustomer(customer)}>    
                
                    <td >{customerLst.indexOf(customer)+1}</td>
                    <td>{customer.CustomerName}</td>
                    <td>{customer.SiteNumber}</td>
                    <td>{customer.City}</td>
                    <td>{customer.Province}</td>
                    <td>{customer.ContactName}</td>
                    <td>{customer.Phone}</td>
                
                </tr>
                )
        return lstOfCustomers;
    }

    chooseCustomer(customer){
        this.setState({CustomerName: customer.CustomerName, SiteNumber: customer.SiteNumber, Address: customer.SiteNumber, 
                        City: customer.City, Province: customer.Province,PostalCode:customer.PostalCode, ContactName: customer.ContactName, 
                        Phone: customer.Phone, CustomerID: customer.CustomerID, modalShow: false, customerSearchlst: null })


    }
    
    ModalList(){
        
        let show = false;
        const handleClose = () => {
            show= false;
            this.setState({modalShow: false, customerSearchlst: null});
        }
        
        if (this.state.customerSearchlst && this.state.modalShow){
            show = true;
            console.log("dentro del if")
             return( 
                        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                Search Result
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Customer Name</th>
                                                <th>Site Number</th>
                                                <th>City</th>
                                                <th>Province</th>
                                                <th>Contact Name</th>
                                                <th>Phone</th>
                                                </tr>
                                            </thead> 
                                            <tbody>
                                                {this.showCustomerSearch()}
                                            </tbody>
                                        </Table>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                            </Modal>
                            
            )}
        }

    render() {
        
        let butText =""
        let formNewCust = null;
        if (this.state.chkNewCustomer){
            butText = "Submit";
            formNewCust = 
            ( <div>
                    <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder={this.state.Address} onChange = {this.handleImput} name="Address" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="City">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange = {this.handleImput} name="City" placeholder={this.state.City}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Province">
                    <Form.Label>Province</Form.Label>
                    <Form.Control as="select" onChange = {this.handleImput} name="Province" placeholder={this.state.Province}>
                        <option>Choose...</option>
                        <option>Alberta</option>
                        <option>British Columbia</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="PostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control onChange = {this.handleImput} name="PostalCode" placeholder={this.state.PostalCode}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="ContactName">
                        <Form.Label>Contact Name:</Form.Label>
                        <Form.Control placeholder={this.state.ContactName}  onChange = {this.handleImput} name="ContactName"/> 
                    </Form.Group>
                    <Form.Group as={Col} controlId="Phone">
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control placeholder={this.state.Phone}  onChange = {this.handleImput} name="Phone"/> 
                    </Form.Group>
                </Form.Row>
                </div>
            );

        } else {
            butText = "Search";
        }
        

        return (
            <div>
                <ServiceStyle>
                <Form onSubmit ={this.handleCustomerSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="CustomerName" >
                    <Form.Label>Customer</Form.Label>
                    <Form.Control type="text" placeholder={this.state.CustomerName} onChange = {this.handleImput} name="CustomerName"/>
                    </Form.Group>
                    

                    <Form.Group as={Col} controlId="SiteNumber">
                    <Form.Label>Site Number:</Form.Label>
                    <Form.Control type="Site" placeholder={this.state.SiteNumber} onChange = {this.handleImput} name="SiteNumber"/>
                    </Form.Group>
                </Form.Row>
                {formNewCust}
                

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="New Customer" onClick= {this.handleChk} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    {butText}
                </Button>
                </Form>
                <div> {this.state.CustomMessage}</div>
                {/* <div> Customer ID : {this.state.CustomerID}</div> */}
                
                
                <div></div>
                
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
                    <Form.Control as="textarea" rows="5" placeholder="Enter a brief description for this ticket" name="Description" onChange = {this.handleImput}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
                </Form>
                </ServiceStyle>
                {this.ModalList()}
                
            </div>
        )
    }

}

export default Services; 