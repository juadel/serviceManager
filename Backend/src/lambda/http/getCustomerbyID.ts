import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import {getCustomerbyID} from '../../businessLogic/customers';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

console.log('Procesing event:', event);
const customer= await getCustomerbyID(event);
return {
    statusCode: 200,
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }, 
    body: JSON.stringify({msg:" The Customer requested is: ", customer})
    }

}