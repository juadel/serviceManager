import React, { Component } from "react";
import getToken from "../../Auth/getToken";
import {Nav, Navbar, Form, FormControl, Col, Table, Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import apiEndpoint  from '../../Config/backendConfig';

class EditCustomer extends Component{


    constructor(props){
        super(props);
        this.state={
            CustomerName: this.props.customer.CustomerName, SiteNumber:this.props.customer.SiteNumber, Address:this.props.customer.Address, 
            City:this.props.customer.City, Province:this.props.customer.Province, PostalCode:this.props.customer.PostalCode, 
            ContactName:this.props.customer.ContactName,
            Phone:this.props.customer.Phone, CustomerID:this.props.customer.CustomerID,
            jwtToken:"",
            user:"",
            show: true,
        };
        this.updateCustomer= this.updateCustomer.bind(this);


    }

    async handleAuth (){
        const token = new getToken();
        await token.token()
        this.setState({
            user: token.state.user, 
            jwtToken: token.state.jwtToken
        })  
    } 


    handleImput = event => {
        this.handleAuth();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({[name] : value })
        // console.log(this.state.SiteNumber);
    }

    handleClose = () => {
        
        this.setState({show: false});
        window.location ="/results"; 

    }

    async updateCustomer(){
        console.log(this.state.jwtToken)
        
        const customer = {
            CustomerName: this.state.CustomerName,
            SiteNumber : this.state.SiteNumber,
            Address: this.state.Address,
            City: this.state.City,
            Province: this.state.Province,
            Phone: this.state.Phone,
            PostalCode: this.state.PostalCode,
            ContactName: this.state.ContactName,
            CustomerID: this.state.CustomerID
        }
       
        await axios.patch(apiEndpoint+'/customer/'+this.state.CustomerID, 
                            customer,
                            {headers: 
                                    { 'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${this.state.jwtToken}`}}
                            ).then(res => {this.handleClose()})
                            .catch(e => console.log(e));

    }

    render() {
       

        return (<div>
                        <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Customer Update
                            </Modal.Title>
                        </Modal.Header>
                         <Modal.Body>
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
                                        

                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.updateCustomer}>Update</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer> 
                         </Modal>
                    </div>
                        
                )



    }

}

export default EditCustomer;