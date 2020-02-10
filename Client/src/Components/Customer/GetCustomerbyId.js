import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';

class GetCustomerbyID extends Component {


   constructor(props){
    super(props);
    this.state ={
        isLoading: true,
        CustomerID :"c18200e2-e410-4725-837f-12dbb82369de",
        customer :[],
    };
    this.getCustomer();
    
    
}
    async getCustomer(){
        
        
        console.log(this.state.CustomerID)
        const token = new getToken();
        await token.token()
        console.log(token.state)
        
        
        await axios.get('https://clnvbo2s2h.execute-api.ca-central-1.amazonaws.com/dev/item/'+this.state.CustomerID+'?item=customer', {headers: 
                    { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token.state.jwtToken}`}}
                    ).then(res => {this.setState({customer : res.data.customer[0]})})
                    .catch(e => console.log(e))            
        console.log(this.state.customer)                                                                       
        }
    
    render (){
       //this.getCustomer(this.props.searchID);

        return(
            <div>
               <p>{this.state.customer.Name} Site: {this.state.customer.SiteNumber}</p>
               <p>{this.state.customer.Address},  {this.state.customer.City}, {this.state.customer.Province} </p>
               <p>{this.state.customer.PostalCode}</p>
               <p> Contact: {this.state.customer.ContactName}, Phone : {this.state.customer.Phone}</p>
               

            </div>
        )
    }

}

export default GetCustomerbyID;