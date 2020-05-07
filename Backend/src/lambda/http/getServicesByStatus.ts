import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {getServicesByStatus} from '../../businessLogic/services';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   const services= await getServicesByStatus(event);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }, 
            body: JSON.stringify({msg:" List of services", services})
        }





    
}