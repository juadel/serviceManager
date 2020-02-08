import React from 'react'
import styled from 'styled-components';
import NewComment from './AddComment';


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
    font-size: 1.5em;  

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
    font-size: 1.5em;
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
    bottom: 15px;
    right: 900px;
    font-size: 1em;
 `;

const ticket = (props) => {
   
   return (
       <Styled>
           
           <IdNumber><p> Ticket Number: {props.ServiceID}</p></IdNumber>
            <Customer> Customer : {props.CustomerID}</Customer>
            <Wrapper>
                
            <p> Title: {props.Title} </p>
            <p> Description: {props.Description}</p>
            
           </Wrapper>   
           <Comments>Ticket Comments: {props.Comments}</Comments>
           <Attach>Ticket Files:</Attach>
           <NewCommentpos><NewComment ServiceID={props.ServiceID} /></NewCommentpos>
       </Styled>
       
       
   )
}

export default ticket;