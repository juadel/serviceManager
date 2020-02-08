import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import Ticket from '../Services/Ticket'
import styled from 'styled-components';
// import { Auth } from 'aws-amplify';
// import ReactLoading from 'react-loading'
// import { Media, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

const CommentStyle = styled.div` 
                    width: 690px;
                    height: 100px;
                    margin: 16px ;
                    border: 1px solid #252525;
                    box-shadow: 0 2px 3px #ccc;
                    padding: 10px;
                    text-align: left;
                   
                `;

class Service extends Component {


   
   constructor(props){
       super(props);
       this.state ={
           isLoading: true,
           ticket:[],
           Comments: []
       };
       this.getService(this.props.ServiceID);
       
   }
   
   async getService(serviceid){
       
        const token = new getToken();
        await token.token()
        console.log(token.state)
        
        await axios.get('https://b1h983jr2c.execute-api.ca-central-1.amazonaws.com/dev/item/'+serviceid+'?item=service', {headers: 
                    { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token.state.jwtToken}`}}
                      ).then(res => {this.setState({isLoading: false, ticket :res.data.ticket[0], Comments: res.data.ticket[0]['Comments']})})
                      .catch(e => console.log(e))
        
        
                      
                                                                               
        }
   
    render() {
     const CommentsArray = this.state.Comments;
     const lstComments = CommentsArray.map((comment) =>  
            
        <div key={new Date()}> <CommentStyle>{comment}</CommentStyle></div>
     ); 
     
       
        return (
        <div>
        <Ticket 
            ServiceID = {this.state.ticket.ServiceID}
            Title = {this.state.ticket.Title}
            Description = {this.state.ticket.Description} 
            CustomerID = {this.state.ticket.CustomerID}
            Comments =  {lstComments} />
          
        </div>        
        )
    }
}
   

    
   
export default Service;