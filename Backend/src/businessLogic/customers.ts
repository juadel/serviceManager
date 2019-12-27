import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";
import { CustomerItem } from "../models/customer";
import { CustomerRequest } from "../requests/customerRequests";
import { Customer } from "../dataLogic/customerLogic";
import {getUserId} from "../lambda/utils";



const CustomerItem = new Customer();

export async function createCustomer( event: APIGatewayProxyEvent ): Promise<CustomerItem> {  
  
  const customerId = uuid.v4();
    const userId = getUserId(event);
    const newCustomer: CustomerRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const createdCustomer = await CustomerItem.createCustomer(
      { 
        userId: userId,
        CustomerID: customerId,
        
        ...newCustomer
      }
    );
  return createdCustomer;
}

export async function updateCustomer(event: APIGatewayProxyEvent ){
  const customerID = event.pathParameters.CustomerID;
  const updatedCustomer : CustomerRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body; 
  const newCustomer= await CustomerItem.updateCustomer(customerID, updatedCustomer);
  return newCustomer;

}

export async function getCustomerbyID(event: APIGatewayProxyEvent):Promise<CustomerItem[]>{
  const CustomerID= event.pathParameters.CustomerID;
  const queryCustomer = await CustomerItem.getCustomer_byID(CustomerID);
  return queryCustomer as CustomerItem[];  
}