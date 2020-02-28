import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken';
import {Form, Button} from 'react-bootstrap';
import  apiEndpoint  from '../../Config/backendConfig';
import {withRouter} from 'react-router-dom';


class NewComment extends Component{

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            newComment: '',
            user: '',
            jwtToken:''
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleChange =this.handleChange.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
    }

    async addComment(ServiceID){
        
        await axios.post(apiEndpoint+'/service/'+ServiceID, {Comments: this.state.newComment },{headers: 
                        { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.jwtToken}`}}
                        ).then(res => {})
                        .catch(e => console.log(e));
        
        console.log(this.state.user);
        window.location ="/results";
        // this.props.history.push({
        //     pathname: "/results",
        //     state: {
        //     searchText: ServiceID,
        //     }});
        // window.location ="/results";
            
    }
    async handleAuth (){
        const token = new getToken();
        await token.token()
        this.setState({
            user: token.state.user, 
            jwtToken: token.state.jwtToken
        })
        
    } 

    

    handleChange = event => {
        this.handleAuth();
        
        const userlog = this.state.user;
        console.log(this.state.user);
        const target = event.target;
        const value = target.value;
        this.setState({newComment : {date: new Date(), By: userlog , text: value }});

    }
    handleSubmit = event => {
        
        event.preventDefault();
        this.addComment(this.props.ServiceID);
        
        

    }

    render() {
        
                
           return (
           <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Add a Comment:</Form.Label>
                    <Form.Control as="textarea" name="textarea" rows="5" cols="80" onChange = {this.handleChange}/>

                </Form.Group>
                 <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
                
                   
           )
       }
}

export default withRouter(NewComment);