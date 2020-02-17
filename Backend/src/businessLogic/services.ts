
import { APIGatewayProxyEvent } from "aws-lambda";
import { ServiceItem } from "../models/service";
import { ServiceRequest } from "../requests/serviceRequest";
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
  const attachmentUrl =[];
  const today = new Date();
  const dueDay= new Date();
  
  const newService: ServiceRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  if (newService.PriorityLevel === "Normal (5 days)"){
      dueDay.setDate(dueDay.getDate()+5);
    } else if (newService.PriorityLevel === "Level 1 (3 days)"){
      dueDay.setDate(dueDay.getDate()+3);
    } else if (newService.PriorityLevel === "Level 2 (next day)"){
      dueDay.setDate(dueDay.getDate()+1);
    }

  
  const createdService = await serviceItem.createService(
      { 
        
        ServiceID: serviceId,
        createdAt: today.toISOString(),
        dueDate: dueDay.toISOString(),
        Comments: comments,
        attachmentUrl: attachmentUrl,
        ...newService
      }
    );
  return createdService;
}

export async function addcomment(event: APIGatewayProxyEvent) {
  const serviceID :string = event.pathParameters.id;
  
  const comment = JSON.parse(event.body)
  let newcomment = "";
  if(comment.Comments) newcomment=comment.Comments;
  
  
  const result= await serviceItem.addComment(serviceID, newcomment);
  return result;
}

export async function serviceUrl(event: APIGatewayProxyEvent ): Promise<string> { 
  
    if (event.queryStringParameters.filename !== undefined &&
        event.queryStringParameters.filename !== null &&
        event.queryStringParameters.filename !== "") {
        
        const filename: string = event.queryStringParameters.filename;
        const id :string = event.pathParameters.id;

        //const description : string = typeof event.body === "string" ? JSON.parse(event.body) : event.body; 
        const generatedUrl= await serviceItem.serviceUrl(id, description, filename);
        return generatedUrl
        }
     else{
      return JSON.stringify({msg:"The request could not be completed, File Name not provided"})
    };
 }
  


export async function serviceExist(event: APIGatewayProxyEvent) : Promise<Boolean>{
  const ticketId :string = event.pathParameters.id;
  let exist : Boolean = await serviceItem.serviceExist(ticketId);
  return exist;
}

export async function getServicebyID(event: APIGatewayProxyEvent) : Promise<ServiceItem[]>{
  const id : string = event.pathParameters.id;
  const queryService = await serviceItem.getServicebyID(id);
  return queryService as ServiceItem[];

}
