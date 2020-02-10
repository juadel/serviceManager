import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';
import NewComment from './AddComment';
import GetCustomerbyID from '../Customer/GetCustomerbyId';
// import { Auth } from 'aws-amplify';
// import ReactLoading from 'react-loading'
// import { Media, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

const CommentStyle = styled.div` 
    display: block;            
    width: 690px;
    height: 100px;
    margin: 16px ;
    border: 1px solid #252525;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    word-wrap: break-word;
    overflow: auto;                    
                  
    `;
const Styled = styled.div`
    width: 1500px;
    height: 900px;
    margin: 16px ;
    border: 1px solid #252529;
    box-shadow: 0 2px 3px #252529;
    padding: 10px;
    text-align: left;
    position: relative;
   `;
const IdNumber = styled.h1`
    font-size: 1.2em;
    text-align: right;
    color: black;
    `;
const Wrapper = styled.section`
    font-size: 1.5em;
    font-family: 'Roboto', 'sans-serif';
    color: black;
    `;
const Customer = styled.div`
    width: 400px;
    height: 200px;
    margin: 16px ;
    border: 1px solid #252529;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    position: absolute;
    bottom: 645px;
    right: 30px;
    font-size: 1em;  
    `;
 const Comments = styled.div`
    width: 750px;
    height: 400px;
    margin: 16px ;
    border: 1px solid #252529;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    position: absolute;
    bottom: 200px;
    right: 700px;
    font-size: 1em;
    overflow: auto;
 `;

 const Attach = styled.div`
    width: 650px;
    height: 400px;
    margin: 16px ;
    border: 1px solid #252529;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
    position: absolute;
    bottom: 200px;
    right: 20px;
 `;

 const NewCommentpos = styled.div`
    position: absolute;
    bottom: 25px;
    right: 900px;
    font-size: 14px;

    
 `;


class GetServicebyID extends React.Component {


   
   constructor(props){
       super(props);
       this.state ={
           isLoading: true,
           searchText:"",
           ticket:[],
           Comments: [],
           
       };
       
       
   }

   handleSearch = () => {
    let searchText = this.props.location.state.searchText;
    this.setState({
      isLoading: false,
      searchText: searchText
    });
    this.getService();
  };

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps) {
    let prevSearch = prevProps.location.state.searchText;
    let newSearch = this.props.location.state.searchText;
    if (prevSearch !== newSearch) {
      this.handleSearch();
    }
  }
   async getService(){
       
        const token = new getToken();
        await token.token()
        console.log(token.state)
        const searchID= this.state.searchText;
        await axios.get('https://clnvbo2s2h.execute-api.ca-central-1.amazonaws.com/dev/item/'+searchID+'?item=service', {headers: 
                    { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token.state.jwtToken}`}}
                      ).then(res => {this.setState({isLoading: false, ticket :res.data.ticket[0], Comments: res.data.ticket[0]['Comments']})})
                      .catch(e => console.log(e))            
                                                                               
        }

   
   
    render() {
     const CommentsArray = this.state.Comments;
     const lstComments = CommentsArray.map((comment) =>  
            
        <div key={CommentsArray.indexOf[comment]}> 
        <CommentStyle>
            <div>
                Date: {comment['date']}
            </div>
            <div>
                By: {comment['By']}
            </div>
            <p> {comment['text']} </p>
            
        </CommentStyle>
        </div>
     ); 
     
       
        return (
        <div>
    
        <Styled>
           
           <IdNumber><p> Ticket Number: {this.state.ticket.ServiceID}</p></IdNumber>
            <Customer> Customer : <GetCustomerbyID searchID ={this.state.ticket.CustomerID}/></Customer>
            <Wrapper>
                
            <p> Title: {this.state.ticket.Title} </p>
            <p> Description: {this.state.ticket.Description}</p>
            
           </Wrapper>   
           <Comments>Ticket Comments: {lstComments}</Comments>
           <Attach>Ticket Files:</Attach>
           <NewCommentpos><NewComment ServiceID ={this.state.ticket.ServiceID} /></NewCommentpos>
        </Styled>
          
        </div>        
        )
    }
}
   

    
   
export default GetServicebyID;