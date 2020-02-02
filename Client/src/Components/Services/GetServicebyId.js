import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import Ticket from '../Services/Ticket'
// import { Auth } from 'aws-amplify';
// import ReactLoading from 'react-loading'
// import { Media, Form, FormGroup, FormControl, Button} from 'react-bootstrap';


class Service extends Component {


   
   constructor(props){
       super(props);
       this.state ={
           isLoading: true,
           ticket:[]
       };
       this.getService(this.props.serviceid);
   }
   
   async getService(serviceid){
       
        const token = new getToken();
        await token.token()
        console.log(token.state)
        
        await axios.get('https://b1h983jr2c.execute-api.ca-central-1.amazonaws.com/dev/item/'+serviceid+'?item=service', {headers: 
                    { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token.state.jwtToken}`}}
                      ).then(res => {this.setState({isLoading: false, ticket :res.data.ticket[0]})})
                      .catch(e => console.log(e))
                                                                       
        }
   
    render() 
    {   //new Ticket
        // const title = this.state.ticket.Title
        // const Description = this.state.ticket.Description
        return (
        <div>
        <Ticket 
            ServiceID = {this.state.ticket.ServiceID}
            Title = {this.state.ticket.Title}
            Description = {this.state.ticket.Description} />
        </div>        
        )
    }

}
export default Service;