import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const XAWS = AWSXRay.captureAWS(AWS);

import { CustomerItem } from "../models/customer"
//import { } from 

export class Customer
{ constructor(
    private docClient: DocumentClient = createDynamoDBClient(),
    //private S3 = createS3Bucket(),
    private customerTable = process.env.CUSTOMER_TABLE,
    //private bucket = 
    //private urlExp = 
    private index = process.env.SUB_INDEX
){}

async createCustomer(customer: CustomerItem ) : Promise<CustomerItem>{
    await this.docClient.put({
        TableName: this.customerTable,
        Item: customer
    }).promise();
    return customer
    }
}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
      console.log("Creating a local DynamoDB instance");
    return new XAWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000"
    });
  }
  return new XAWS.DynamoDB.DocumentClient();
}
