import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import {updateCustomer} from '../../businessLogic/customers';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // updating a customer
    const item = await updateCustomer(event)
  
    return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
      body: JSON.stringify({msg:"customer updated successfully",
        item
      })
    };
  };
  