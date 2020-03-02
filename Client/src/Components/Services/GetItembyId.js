import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';
import NewComment from './AddComment';
import {Card, Button, Spinner, Nav, Navbar, Form, Modal, Container, Row, Col} from 'react-bootstrap';
import GMaps from './googleMaps';
import Geocode from 'react-geocode';
import Archives from './Archives';
import  apiEndpoint  from '../../Config/backendConfig';
import EditCustomer from '../../Components/Customer/EditCustomer';
import '../../App.css';



const CommentStyle = styled.div`          
    
    margin: 16px ;
    position: relative;                             
    `;

const IdNumber = styled.h1`
    font-size: 1.2em;
    position: relative;
    `;
const Wrapper = styled.div`
    font-size: 1em;
    position: relative;
    `;
const Customer = styled.div`
    text-align: left;
    position: relative;
     
    `;
const Maps = styled.div`
    text-align: left;
    position: relative;     
    `;
 const Comments = styled.div`
    overflow: auto;
    position: relative; 
    height: 300px;
    
 `;

 const Attach = styled.div`
    position: relative;
    height: 300px;
    text-align: left;
    top: 20px;
 `;

 const NewCommentpos = styled.div`
    position: relative;
    font-size: 14px;
 `;
 


class GetItembyID extends Component {


   
   constructor(props){
       super(props);
       this.state ={
           isLoading: true,
           
           ticket:[],
           Comments: [],
           CustomerId: "", CustomerName: "", SiteNumber:"", Address:"", City:"", Province:"",PostalCode:"", ContactName:"", Phone:"", 
           zoom : 8,
           Addressfull: "",
           coordinates: null,
           newSearch: false,
           editCustomer: false,
           reload: false,
           
       };
       
       
   }

   handleSearch() {
    
        let newSearchText = this.props.location.state.searchText;
        //console.log(newSearchText);
        
        this.getItem(newSearchText,"service");
       // console.log(this.state.searchText);
        
  };

  componentDidMount() {
   
    this.handleSearch();
  }

  

  componentDidUpdate(prevProps) {
    
    let prevSearch = prevProps.location.state.searchText;
    console.log("Prev Search: ",prevSearch)
    let newSearchText = this.props.location.state.searchText;
    console.log("new Search: ",newSearchText)
    if (prevSearch !== newSearchText) {
        this.setState({newSearch: true})
        this.handleSearch();             
    }
    if (this.state.newSearch === true){
        console.log("new search is true" )
        this.handleSearch();  
    }

  }

  handleMaprequest(){
    
    if (this.state.coordinates!==null) {
        if (this.state.newSearch===true){
            console.log("new search, reseting google maps")
            this.setState({ coordinates: null, newSearch : false,})
            
            return (<div>
                <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
                </Spinner>
            </div>)
        }else {
            console.log("first search, Starting google maps")
            return(
                <div>
                    <GMaps Coordinates={this.state.coordinates}/>
                </div>
            )
        }
    }
    else {
            console.log("No coordinates ");
            return(<div><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner></div>)
        }
}

  handleGeolocation() {
        this.setState({Addressfull: this.state.Address +" "+ this.state.City +" "+ this.state.Province +" "+ this.state.PostalCode})
        Geocode.setApiKey(process.env.REACT_APP_GM_KEY);
        const customerAddress = this.state.Addressfull;
        Geocode.fromAddress(customerAddress).then(
        response => {
                const { lat, lng } = response.results[0].geometry.location;
                //console.log(lat, lng);
                
                this.setState({coordinates:{lat: lat, lng:lng}}); 
                }).catch(error => {console.error(error)}); 


    }
    
    editButton = () => {
        this.setState({editCustomer: true})

    }
    handleCustomerEdit(){
        let customer = null;
        if (this.state.editCustomer){
            customer = {
                CustomerName: this.state.CustomerName,
                SiteNumber : this.state.SiteNumber,
                Address: this.state.Address,
                City: this.state.City,
                Province: this.state.Province,
                Phone: this.state.Phone,
                PostalCode: this.state.PostalCode,
                ContactName: this.state.ContactName,
                CustomerID: this.state.CustomerId
            }
            
            return(
                <EditCustomer customer={customer}/>
            )
        }
    }
      
   async getItem(ID, type){
       
        const token = new getToken();
        await token.token();
        
        await axios.get(apiEndpoint+'/item/'+ID+'?item='+type, {headers: 
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
                                                CustomerName: res.data.customer[0]['CustomerName'], 
                                                SiteNumber: res.data.customer[0]['SiteNumber'],
                                                Address: res.data.customer[0]['Address'],
                                                City: res.data.customer[0]['City'],
                                                Province: res.data.customer[0]['Province'],
                                                PostalCode: res.data.customer[0]['PostalCode'], 
                                                ContactName: res.data.customer[0]['ContactName'],
                                                Phone: res.data.customer[0]['Phone']
                                            })
                                            this.handleGeolocation();
                                        }
                                        
                                    })
                      .catch(e => {console.log(e); alert("No Ticket or Customer has been found");
                                    window.location = "/"})  
        //window.location ="/results"; 
                            
                                                                               
        }

    
   
    render() {
    
    const showMap = this.handleMaprequest();
    const customerEdit= this.handleCustomerEdit();
    const CommentsArray = this.state.Comments;
    const lstComments = CommentsArray.map((comment) =>  
            
        <div key={CommentsArray.indexOf[comment]}> 
        <CommentStyle>
            <Card style={{ width: '35rem' }}>
            <Card.Body>
            <Card.Title>Date: {comment['date']} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">By: {comment['By']}</Card.Subtitle>
                    <Card.Text>
                        {comment['text']}
                    </Card.Text>
            </Card.Body>
            </Card>
        </CommentStyle>
        </div>
        ); 
     
       
        return (
        <div>
            <Container>
            <Row>
                <Col>
                    <IdNumber className="hr"> <hr/>Ticket Number: {this.state.ticket.ServiceID}</IdNumber>
                </Col>
            </Row>
            <Row >
                <Col>
                <Customer> 
                <Card style={{ width: '30rem' }}>     
                <Card.Body>
                    <Card.Title>{this.state.CustomerName} </Card.Title>
                    <Card.Text>
                    <p> Site Number: {this.state.SiteNumber}</p>
                    <p>{this.state.Address}  {this.state.City}, {this.state.Province} , {this.state.PostalCode}</p>
                    <p> Contact: {this.state.ContactName},   Phone : {this.state.Phone}</p>
                    </Card.Text>
                    <Button variant="primary" onClick={this.editButton}>edit</Button>
                </Card.Body>
                </Card>
                </Customer>
                <Wrapper>
                <Card style={{ width: '30rem' }}>
                <Card.Body >
                    <Card.Title> {this.state.ticket.Title} </Card.Title>
                    <Card.Text>
                        <p>Description:</p>
                    {this.state.ticket.Description}
                    </Card.Text>
                </Card.Body>
                </Card>
                </Wrapper>
                </Col>
                <Col>
                <Maps>
                    <Card style={{ width: '30rem'}}>
                    {showMap}
                    </Card>
                </Maps>
                </Col>
           </Row>
           <Row>
                <Col> 
                    <div > <hr/> </div>
                </Col> 
            </Row>
           <Row>
                <Col >
                <Comments>
                <Card> 
                   <Card.Header>Comments</Card.Header>
                    {lstComments}
                </Card>
                </Comments>
                </Col>
                <Col >
                <NewCommentpos><NewComment ServiceID={this.state.ticket.ServiceID} /></NewCommentpos>
                {customerEdit}
                </Col>
           </Row>
           <Row>
                <Col> 
                    <div > <hr/> </div>
                </Col>
           </Row> 
           <Attach>
                <Archives url={this.state.ticket.attachmentUrl} descriptionArray={this.state.ticket.fileDescription} serviceID={this.state.ticket.ServiceID}/>
            </Attach>
            <Row>
                <Col> 
                    <div > <hr/> </div>
                </Col>
            </Row>
            </Container> 
        </div>    
        )
    }
}
   
export default GetItembyID;