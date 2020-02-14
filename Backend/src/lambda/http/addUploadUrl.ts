import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { serviceUrl, serviceExist } from "../../businessLogic/services";
import { customerExist, customerUrl} from '../../businessLogic/customers';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.queryStringParameters.item == "service"){
     let exist : Boolean = await serviceExist(event);
     if (exist){
      
        const Url = await serviceUrl(event);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
              },
            body: JSON.stringify({msg:"Signed Url created", Url
              
            })
          };
      }
  } else if (event.queryStringParameters.item == "customer"){
      let exist : Boolean = await customerExist(event);
      if (exist){
        
        const Url = await customerUrl(event);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
              },
            body: JSON.stringify({msg:"Signed Url created",
              Url
            })
          };
        }
    }

}