
import { APIGatewayProxyEvent } from "aws-lambda";
import { ServiceItem } from "../models/service";
import { ServiceRequest } from "../requests/serviceRequest";
import { commentRequest } from "../requests/commentRequest";
import { Service } from "../dataLogic/serviceLogic";
import { createCounter } from "./counterLogic";
import { isActiveCounter } from "./counterLogic";
import { increaseCounter} from "./counterLogic";





const serviceItem= new Service();


export async function createService( event: APIGatewayProxyEvent ): Promise<ServiceItem> {
    
  if (!isActiveCounter(process.env.ATOMIC_ID)){
        await createCounter(process.env.ATOMIC_ID);
      }
  
  const count = JSON.stringify((await increaseCounter(process.env.ATOMIC_ID)).Attributes.ticket);
   

  const serviceId =count;
  const comments = [];
  const today = new Date();
  const dueDay= new Date();
  dueDay.setDate(dueDay.getDate()+5);
  const newService: ServiceRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const createdService = await serviceItem.createService(
      { 
        
        ServiceID: serviceId,
        createdAt: today.toISOString(),
        dueDate: dueDay.toISOString(),
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
  let table : string 
  if (event.pathParameters.table == "service"){
      table = process.env.SERVICE_TABLE;
  }else {
     table = process.env.CUSTOMER_TABLE ;
  };
  const id = event.pathParameters.ID;
  const generatedUrl= await serviceItem.signedUrl(table, id);
  return generatedUrl
  
}

export async function ticketExist(event: APIGatewayProxyEvent) : Promise<Boolean>{
  const ticketId :string = event.pathParameters.id;
  let exist : Boolean = await serviceItem.ticketExist(ticketId);
  return exist;
}

export async function getServicebyID(event: APIGatewayProxyEvent) : Promise<ServiceItem[]>{
  const id : string = event.pathParameters.id;
  const queryService = await serviceItem.getServicebyID(id);
  return queryService as ServiceItem[];

}
