import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {getCustomerbyName} from '../../businessLogic/customers';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   const customer= await getCustomerbyName(event);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }, 
            body: JSON.stringify({msg:" The Customer requested is: ", customer})
        }





    
}