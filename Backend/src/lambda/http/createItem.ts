import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { createService } from "../../businessLogic/services";
import { createCustomer } from "../../businessLogic/customers";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.queryStringParameters.item == "service"){
        const item = await createService(event);
        return {
            statusCode:200,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({msg:"Service created successfully",
            item
            })
        };
    }else if(event.queryStringParameters.item == "customer"){
              const item = await createCustomer(event);
               return {
                statusCode:200,
                headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
                 },
                 body: JSON.stringify({msg:"Customer created successfully",
                  item
                 })
             };
    } else {
        
        return {
            statusCode:400,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({msg:"Was not possible to create item"})
        };
    };
}