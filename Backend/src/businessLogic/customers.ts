import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";
import { CustomerItem } from "../models/customer";
import { CustomerRequest } from "../requests/customerRequests";
import { Customer } from "../dataLogic/customerLogic";




const customerItem = new Customer();

export async function createCustomer( event: APIGatewayProxyEvent ): Promise<CustomerItem> {  
  
  const customerId = uuid.v4();
  const attachmentUrl =[];  
  const newCustomer: CustomerRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  

  const createdCustomer = await customerItem.createCustomer(
      { 
        
        CustomerID: customerId,
        attachmentUrl: attachmentUrl,
        ...newCustomer
      }
    );
  return createdCustomer;
}

export async function updateCustomer(event: APIGatewayProxyEvent ){
  const customerID = event.pathParameters.id;
  const updatedCustomer : CustomerRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body; 
  const newCustomer= await customerItem.updateCustomer(customerID, updatedCustomer);
  return newCustomer;

}

export async function getCustomerbyID(event: APIGatewayProxyEvent):Promise<CustomerItem[]>{
  const CustomerID= event.pathParameters.id;
  const queryCustomer = await customerItem.getCustomerbyID(CustomerID);
  return queryCustomer as CustomerItem[];  
}

export async function customerExist(event: APIGatewayProxyEvent): Promise<Boolean>{
  const customerId: string = event.pathParameters.id;
  const exist: Boolean = await customerItem.customerExist(customerId);
  return exist;

}

export async function customerUrl(event: APIGatewayProxyEvent): Promise<string>{
  const id = event.pathParameters.id;
  const filename = event.queryStringParameters.filename;
  const url = await customerItem.customerUrl(id, filename);
  return url;
}