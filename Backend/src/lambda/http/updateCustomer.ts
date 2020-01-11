import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {updateCustomer, customerExist} from '../../businessLogic/customers';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const exist : Boolean = await customerExist(event);
    if (exist){
      const item = await updateCustomer(event);
      return {
        statusCode:200,
        headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
         },
        body: JSON.stringify({msg:"Customer updated successfully",
        item
          })}
      } else {

        return {
          statusCode:400,
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({msg:"Customer don't exists"})
        };
      };
}
  