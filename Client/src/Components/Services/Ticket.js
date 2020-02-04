import React from 'react'
import styled from 'styled-components';

const Styled = styled.div`
    width: 95%;
    margin: 16px ;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    text-align: left;
   `;
const IdNumber = styled.h1`
    font-size: 1em;
    text-align: right;
    color: black;
    `;
const Wrapper = styled.section`
    font-size: 1em;

    `;

const ticket = (props) => {


   return (
       <Styled>
           
           <IdNumber>
               <p> Ticket Number: {props.ServiceID}</p>
            </IdNumber>
            <Wrapper>
           <p> Title: {props.Title} </p>
           <p> Description: {props.Description}</p>
           </Wrapper>
       </Styled>
   )
}

export default ticket;