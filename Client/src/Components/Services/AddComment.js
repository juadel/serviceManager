import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken';


class NewComments extends Component{

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            newComment: ''
            
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleChange =this.handleChange.bind(this);
    }

    async addComment(ServiceID){
        const token = new getToken();
        await token.token()
        await axios.post('https://b1h983jr2c.execute-api.ca-central-1.amazonaws.com/dev/service/'+ServiceID, {Comments: this.state.newComment },{headers: 
                        { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.state.jwtToken}`}}
                        ).then(res => {})
                        .catch(e => console.log(e))
        window.location ="/retrieve"
            
    }

    handleChange = event => {
        this.setState({newComment : event.target.value});

    }
    handleSubmit = event => {
        event.preventDefault();
        this.addComment(this.props.ServiceID);
        

    }

    render() {
        
                
           return (
           <div>
            <form onSubmit={this.handleSubmit}>
                    <label>
                        <div>Add a Comment:</div>
                        <textarea rows="5" cols="50" type="text" name="Comment" onChange={this.handleChange}/>
                    </label>
                    <div><input type = "Submit" value="Submit"/></div>
            </form>
                
           </div>        
           )
       }
}

export default NewComments;