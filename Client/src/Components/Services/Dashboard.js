import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import Ticket from '../Services/Ticket'
import styled from 'styled-components';

class Service extends Component {



    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            ticket:[],
            Comments: []
        };
        this.getServices(this.props.ServiceID);
    }
    


}