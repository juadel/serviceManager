import React, {Component} from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import ReactLoading from 'react-loading'
import { Media, Form, FormGroup, FormControl, Button} from 'react-bootstrap';


class Service extends Component {


   
   constructor(){
       super();
       this.state ={
           jwtToken :"",
           isLoading: true,
           ticket:[]
       };
       this.getService('1');
   }
   
   async getService(serviceid){

        await Auth.currentSession().then( data => this.setState({jwtToken:data.idToken.jwtToken})).catch(e => console.log(e))
        await axios.get('https://b1h983jr2c.execute-api.ca-central-1.amazonaws.com/dev/item/'+serviceid+'?item=service', {headers: 
                    { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${this.state.jwtToken}`}}
                      ).then(res => {this.setState({isLoading: false, ticket :res.data.ticket})})
                      .catch(e => console.log(e))
        console.log(this.state.ticket[0].Title)                                        
                                            
                                                
        }
     
                                        
   
   
    render() 
    {    const title = this.state.ticket
    
        
        return (
            <div>
                <h1>{title}</h1>
            </div>
            
        )
    }

}
export default Service;