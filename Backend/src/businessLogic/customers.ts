import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";
import { CustomerItem } from "../models/customer"
import { CustomerRequest } from "../requests/customerRequest"
import { Customer } from "../dataLogic/customerLogic"

const CustomerItem = new Customer();

export async function createCustomer( event: APIGatewayProxyEvent ): Promise<CustomerItem> {
    const customerId = uuid.v4();
    //const userId = getUserId(event);
    const newCustomer: CustomerRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const createdCustomer = await CustomerItem.createCustomer(
      { 
        //userId: userId,
        CustomerID: customerId,
        //createdAt: new Date().toISOString(),
        //done: false,
        ...newCustomer
      }
    );
  return createdCustomer;
}