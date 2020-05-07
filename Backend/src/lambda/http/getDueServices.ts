import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {getDueServices} from '../../businessLogic/services';


export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
   const services= await getDueServices();
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }, 
            body: JSON.stringify({msg:" List of Due services", services})
        }





    
}