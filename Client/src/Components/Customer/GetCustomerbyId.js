import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';

class GetCustomerbyID extends Component {


   constructor(props){
    super(props);
    this.state ={
        isLoading: true,
        customer :[]
    };
    this.getCustomer(this.props.searchID);
    
    
}
    async getCustomer(searchID){
       
        const token = new getToken();
        await token.token()
        console.log(token.state)
        console.log(searchID)
        
        await axios.get('https://clnvbo2s2h.execute-api.ca-central-1.amazonaws.com/dev/item/'+searchID+'?item=customer', {headers: 
                    { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token.state.jwtToken}`}}
                      ).then(res => {this.setState({isLoading: false, customer :res.data.Customer})})
                      .catch(e => console.log(e))            
                                                                               
        }
    
    render (){
       //this.getCustomer(this.props.searchID);

        return(
            <div>
                {this.state.customer}
            </div>
        )
    }

}

export default GetCustomerbyID;