
import { APIGatewayProxyEvent } from "aws-lambda";
import { ServiceItem } from "../models/service";

import { ServiceRequest } from "../requests/serviceRequest";
import { commentRequest } from "../requests/commentRequest"
import { Service } from "../dataLogic/serviceLogic";
import { createCounter } from "../businessLogic/counter";
import { isActiveCounter } from "../businessLogic/counter"
import { increaseCounter} from "../businessLogic/counter"



const serviceItem= new Service();


export async function createService( event: APIGatewayProxyEvent ): Promise<ServiceItem> {
    
  if (!isActiveCounter(process.env.ATOMIC_ID)){
        await createCounter(process.env.ATOMIC_ID);
      }
  
  const count = JSON.stringify((await increaseCounter(process.env.ATOMIC_ID)).Attributes.ticket);
   

  const serviceId =count;
  const comments = [];
  const newService: ServiceRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const createdService = await serviceItem.createService(
      { 
        //userId: userId,
        ServiceID: serviceId,
        createdAt: new Date().toISOString(),
        Status: false,
        Comments: comments,
        ...newService
      }
    );
  return createdService;
}

export async function addcomment(event: APIGatewayProxyEvent) {
  const serviceID :string = event.pathParameters.serviceID;
  const newcomment : commentRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body; 
  const result= await serviceItem.addComment(serviceID, newcomment);
  return result;
}

export async function addUploadUrl(event: APIGatewayProxyEvent ): Promise<string> {
  // const table : string 
  if (event.pathParameters.table == "service"){
      var table = process.env.SERVICE_TABLE;
  }else {
     var table = process.env.CUSTOMER_TABLE ;
  };
  const id = event.pathParameters.ID;
  const generatedUrl= await serviceItem.signedUrl(table, id);
  return generatedUrl
  
}


