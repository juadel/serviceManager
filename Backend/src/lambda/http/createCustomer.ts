import 'source-map-support/register';
//import {getUserId} from "../../auth/authorization";

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import {createCustomer} from '../../businessLogic/customers';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // creating a customer
  //const userID = getUserId(event);
  const item = await createCustomer(event)

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
    body: JSON.stringify({msg:"customer created successfully",
      item, //userID
    })
  };
};
