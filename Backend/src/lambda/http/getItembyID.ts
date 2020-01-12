import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import {getCustomerbyID} from '../../businessLogic/customers';
import {getServicebyID} from '../../businessLogic/services';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.queryStringParameters.item == "service"){
        console.log('Searching for ticket');
        const ticket= await getServicebyID(event);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }, 
            body: JSON.stringify({msg:" The Service requested is: ", ticket})
        }

    } else if (event.queryStringParameters.item == "customer"){
        console.log('Searching for customer');
        const customer= await getCustomerbyID(event);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }, 
            body: JSON.stringify({msg:" The Customer requested is: ", customer})
        }
    } else {
        return {
            statusCode:400,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({msg:"Please select Customer or service"})
        };
    };

}