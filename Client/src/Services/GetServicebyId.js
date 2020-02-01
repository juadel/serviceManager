import React, {Component} from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import ReactLoading from 'react-loading'
import {Media} from 'react-bootstrap';


class Service extends Component {


   
   constructor(props){
       super();
       this.state ={
           isLoading: true,
           ticket:[],
           
       };
       this.getService('1');
   }
   
   getService(serviceid){

        Auth.currentSession().then(data => {axios.get('https://b1h983jr2c.execute-api.ca-central-1.amazonaws.com/dev/item/'+serviceid+'?item=service',
                                                    {headers: { 'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${data.idToken.jwtToken}`
                                            }}).then(res => {this.setState({isLoading: false, ticket :res.data.ticket})
                                                });
                                            
                                            
                                        })
        
        
        // Auth.currentSession().then(data => {this.setState({ticket: [], jwtToken : data.idToken.jwtToken});
        //                                     console.log(this.state.jwtToken)})
        
        // axios.get('https://b1h983jr2c.execute-api.ca-central-1.amazonaws.com/dev/item/'+serviceid+'?item=service',
        //             {headers: { 'Content-Type': 'application/json',
        //                         'Authorization': `Bearer ${this.state.jwtToken}`
        //                         }}
        //         ).then(res => this.setState({ticket : res.data.ticket})).catch(err => console.log(err));
           
        // };
   }
   
    render() 
    {   
        const serviceTicket = this.state.ticket.map((ticket)=> 
            <Media key={ticket.ServiceID}>
                <Media.left>
                    <a href={ticket.attachmentUrl}>
                        <img width={64} height={64} src={ticket.attachmentUrl}
                        alt="Image"/>
                    </a>
                </Media.left>
                <Media.Body>
                    <Media.Heading>{ticket.Title}</Media.Heading>
                    <p>Description: {ticket.Description}</p>
                </Media.Body>
            </Media>
        )
        
        return (
            <div>
                {this.state.isLoading && 
                            <ReactLoading type="spinningBubbles" color="#444"/>
                }
                {serviceTicket}
            </div>
            
        )
    }

}
export default Service;