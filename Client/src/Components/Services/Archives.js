import React, {Component} from 'react';
import {Card, Table, Accordion, Button, FormControl, Form, Col} from 'react-bootstrap';



class Archives extends Component{

 constructor(props){
     super(props);
     this.state ={

     }
    }

    getFiles = (archives) =>{
        archives.map((file) =>  
            <tr>
            <td>{archives.indexOf[file]}</td>
            <td>{file['url']}</td>
            <td>{file['description']}</td>
            </tr>
        );
            

    }
    handleFiles(){

    }



    render(){
        return(
            <div>
                <Card> 
                   <Card.Header>Archives</Card.Header>
                   <Card.Text>
                   <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getFiles}
                        </tbody>
                        
                    </Table>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <Button variant="primary" type="submit">Add a file</Button> 
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            
                                <Form >
                                    <Form.Row>

                                        <Form.Group as={Col} controlId="File">
                                            <Form.Label>Description</Form.Label>
                                            <FormControl placeholder="Description" onChange = {this.handleFileDescription} name="FileDescription"/> 
                                        </Form.Group> 
                                        
                                        <Form.Group as={Col} controlId="File">
                                            <Form.Label>File to Upload</Form.Label>
                                            <FormControl name="files" type="file" onChange={this.handleFiles}/>
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                                
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                <Button variant="primary" type="submit">Upload</Button> 
                                </Accordion.Toggle>
                                
                                


                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                    </Card.Text>
                   

               
               </Card>
            </div>
        )
    }
}

export default Archives;