import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';
import NewComment from './AddComment';

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


class GetServicebyID extends Component {


   
   constructor(props){
       super(props);
       this.state ={
           isLoading: true,
           
           ticket:[],
           Comments: [],
           CustomerId: "", CustomerName: "", SiteNumber:"", Address:"", City:"", Province:"",PostalCode:"", ContactName:"", Phone:"",
           
       };
       
       
   }

   handleSearch() {
    
        let newSearchText = this.props.location.state.searchText;
        console.log(newSearchText);
        
        this.getItem(newSearchText,"service");
        console.log(this.state.searchText);
        
  };

  componentDidMount() {
   
    this.handleSearch()
  }

  componentDidUpdate(prevProps) {
    let prevSearch = prevProps.location.state.searchText;
    let newSearch = this.props.location.state.searchText;
    if (prevSearch !== newSearch) {
        
        console.log(this.state.searchText)
        this.handleSearch()
        
    } 
  }
   async getItem(ID, type){
       
        const token = new getToken();
        await token.token()
        console.log(token.state)
        
        await axios.get('https://clnvbo2s2h.execute-api.ca-central-1.amazonaws.com/dev/item/'+ID+'?item='+type, {headers: 
                    { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token.state.jwtToken}`}}
                      ).then(res => {
                                        if (type==="service"){
                                        this.setState({ 
                                        isLoading: false, ticket :res.data.ticket[0], 
                                        Comments: res.data.ticket[0]['Comments'],
                                        CustomerId:res.data.ticket[0]['CustomerID'] });
                                        this.getItem(this.state.CustomerId,"customer")
                                        } else {
                                            this.setState({
                                                CustomerName: res.data.customer[0]['Name'], 
                                                SiteNumber: res.data.customer[0]['SiteNumber'],
                                                Address: res.data.customer[0]['Address'],
                                                City: res.data.customer[0]['City'],
                                                Province: res.data.customer[0]['Province'],
                                                PostalCode: res.data.customer[0]['PostalCode'], 
                                                ContactName: res.data.customer[0]['ContactName'],
                                                Phone: res.data.customer[0]['Phone'],
                                            })

                                        }
                                        
                                    })
                      .catch(e => {console.log(e); alert("No Ticket or Customer has been found")})  
        //window.location ="/results"; 
                            
                                                                               
        }

   
   
    render() {
     //console.log(this.state.CustomerId) 
    
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
            <Customer> Customer: 
            <div>
               <p>{this.state.CustomerName}  / Site: {this.state.SiteNumber}</p>
               <p>{this.state.Address}  {this.state.City}, {this.state.Province} </p>
               <p>{this.state.PostalCode}</p>
               <p> Contact: {this.state.ContactName}  Phone : {this.state.Phone}</p>
            </div>

            </Customer>
            <Wrapper>
                
            <p> Title: {this.state.ticket.Title} </p>
            <p> Description: {this.state.ticket.Description}</p>
            
           </Wrapper>   
           <Comments>Ticket Comments: {lstComments}</Comments>
           <Attach>Ticket Files:</Attach>
           <NewCommentpos><NewComment ServiceID={this.state.ticket.ServiceID} /></NewCommentpos>
        </Styled>
          
        </div>        
        )
    }
}
   

    
   
export default GetServicebyID;