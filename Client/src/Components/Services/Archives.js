import React, {Component} from 'react';
import {Card, Table, Accordion, Button, FormControl, Form, Col, ProgressBar} from 'react-bootstrap';
import Styled from 'styled-components';
import axios from 'axios';
import getToken from '../../Auth/getToken';
import  apiEndpoint  from '../../Config/backendConfig';


const TableStyle = Styled.div`
    
    overflow-y: scroll;
    height: 200px;
    
    `;



class Archives extends Component{

 constructor(props){
     super(props);
     this.state ={
         file: null,
         filename: '',
         UploadUrl: '',
         FileDescription:'',
         user:'',
         jwtToken:'',
         filesOn: [],
         DescriptionArray: [],
         uploadProgress: null

     };
     this.handleAuth(); 
     
     
     
    }
    //to assigne a props variable to state once the component is mount
    UNSAFE_componentWillReceiveProps(props) {
        this.setState({filesOn: props.url, DescriptionArray: props.descriptionArray});
    }
        
    updateProgressBarValue(percentage){
        
        if (percentage !== 0){

            return(<ProgressBar now={percentage} />)
        }
            
        
    }

    getFiles(){
        //console.log(this.state.filesOn)
        
       
      

           const archivesArray = this.state.filesOn;
           const lstOfFiles = archivesArray.map((file) =>
                            
                                <tr>
                                    <td>{archivesArray.indexOf(file)+1}</td>
                                    <td>< a href={file}>{file.split(".com/")[1]}</a></td>
                                    <td>{this.state.DescriptionArray[archivesArray.indexOf(file)]}</td>
                                </tr>
                            
            )
        
            return lstOfFiles;
        
    }
    handleFiles = event => {
        // save file and filename on State
        this.setState({
            file: event.target.files[0], 
            filename: event.target.files[0]['name'] 
            });      
    }

    handleFileDescription = event => {
        this.setState({FileDescription: event.target.value});
        console.log(event.target.value)

    }
    handleFilesSubmit = event =>{
        this.getSignedUrl();
       
        event.preventDefault();
    }

    async getSignedUrl(){
        console.log(this.state.jwtToken);
        //REQUESTING SIGNED URL
        await axios.patch(apiEndpoint+'/item/'+this.props.serviceID+'?item=service&filename='+this.state.filename, 
                                {description: this.state.FileDescription },
                                {headers:{ 'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${this.state.jwtToken}`}},
                                
                                            ).then(res => {
                                                this.setState({UploadUrl: res.data.Url}); 
                                                console.log(this.state.UploadUrl);
                                                this.UploadFile();
                                            }).catch(e => {console.log(e)});
        

    }

    async UploadFile(){
        await axios.put(this.state.UploadUrl, this.state.file,{
            onUploadProgress: (Progress) => {
                   if (Progress.lengthComputable) {
                           console.log(Progress.loaded + ' ' + Progress.total);
                           if (Progress.total!==null){
                                    this.setState({uploadProgress: Math.round((Progress.loaded *100)/Progress.total)})
                                }
                       }
                 } 
            }).then(res => { window.location ="/results"})
              .catch(e => console.log(e))
    }

    async handleAuth (){
        const token = new getToken();
        await token.token();
        this.setState({
            user: token.state.user, 
            jwtToken: token.state.jwtToken
        })
        
    } 




    render(){
       
        
        

        
        return(<div>
            <div>
            
                <Card style={{ width: '30rem' }}> 
                   <Card.Header>Archives</Card.Header>
                   <Card.Text><TableStyle>
                   <Table striped bordered hover>
                    <thead>
                            <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>Description</th>
                            </tr>
                        </thead> 
                        <tbody>
                           {this.getFiles()}
                        </tbody>
                       
                    </Table> </TableStyle>
                    </Card.Text>
                </Card>
                
                
            </div>
            <div>
                <Accordion>
                    <Card style={{ width: '30rem' }}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <Button variant="primary" type="submit">Add a file</Button> 
                            </Accordion.Toggle>
                                {this.updateProgressBarValue(this.state.uploadProgress)}
                        </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            
                                <Form >
                                    <Form.Row>

                                        <Form.Group as={Col} controlId="FileDescr">
                                            <Form.Label>Description</Form.Label>
                                            <FormControl name="Description" type="text" onChange = {this.handleFileDescription} /> 
                                        </Form.Group> 
                                        
                                        <Form.Group as={Col} controlId="File">
                                            <Form.Label>File to Upload</Form.Label>
                                            <FormControl name="files" type="file" onChange={this.handleFiles}/>
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                                
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                <Button variant="primary" type="submit" onClick={this.handleFilesSubmit}>Upload</Button> 
                                </Accordion.Toggle>
                            </Card.Body>
                            </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div></div>
                    
                   

               
               
               
            
        )
    }
}

export default Archives;