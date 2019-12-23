
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

import { CustomerItem } from "../models/customer"
import { CustomerRequest } from "../requests/customerRequests";
//import { } from 

export class Customer
{ constructor(
    private docClient: DocumentClient = createDynamoDBClient(),
    //private S3 = createS3Bucket(),
    private customerTable = process.env.CUSTOMER_TABLE,
    //private bucket = 
    //private urlExp = 
    //private index = process.env.SUB_INDEX
){}

async createCustomer(customer: CustomerItem ) : Promise<CustomerItem>{
    await this.docClient.put({
        TableName: this.customerTable,
        Item: customer
    }).promise();
    return customer
    }

async updateCustomer(customerID : string, updatedCustomer:CustomerRequest){
    const updateCustomer = await this.docClient.update({
        TableName: this.customerTable,
        Key: { customerID },
        ExpressionAttributeNames: {"#N": "name", "#A":"Address", "#C":"City", "#P":"PostalCode", "#Pr":"Province", "#Ph":"Phone", "#CN":"ContactName" },
        ConditionExpression: '#N NE :name OR #A NE :address OR #C NE :city OR #P NE :postal OR #Pr NE :province OR #ph NE :phone OR #CN NE :contact',
        UpdateExpression: 'set #N=:name, #A=:address, #C=:city, #P=:postal, #Pr=:province, #Ph=:phone, #CN =#contact',
        ExpressionAttributeValues:{
            ':name':updatedCustomer.Name,
            ':address': updatedCustomer.Address,
            ':city': updatedCustomer.City,
            ':postal': updatedCustomer.PostalCode ,
            ':province':updatedCustomer.Province,
            ':phone': updatedCustomer.Phone,
            ':contact': updatedCustomer.ContactName,
        },
        ReturnValues: "UPDATED_NEW"
    }).promise();
    return updateCustomer
}


}



function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
      console.log("Creating a local DynamoDB instance");
    return new AWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000"
    });
  }
  return new AWS.DynamoDB.DocumentClient();
}
