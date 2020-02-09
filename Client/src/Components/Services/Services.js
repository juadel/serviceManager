import React, {Component} from 'react';
import axios from 'axios';
import getToken from '../../Auth/getToken'
import styled from 'styled-components';

class Services extends Component{

    constructor(props){
        super(props);
        this.state={

        };

    }

    render() {
        
        return (
            <div>
                <div>Create new Ticket</div>
                <div>Search Ticket</div>
            </div>
        )
    }

}

export default Services; 