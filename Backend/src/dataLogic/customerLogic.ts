
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

import { CustomerItem } from "../models/customer"
import { CustomerRequest } from "../requests/customerRequests";


export class Customer
{ constructor(
    private docClient: DocumentClient = createDynamoDBClient(),
    private S3 = createS3Bucket(),
    private customerTable = process.env.CUSTOMER_TABLE,
    private bucket = process.env.BUCKET,
    private urlExp = 300
    //private index = process.env.SUB_INDEX
){}

async createCustomer(customer: CustomerItem ) : Promise<CustomerItem>{
    await this.docClient.put({
        TableName: this.customerTable,
        Item: customer
    }).promise();
    return customer
    }

    //CLIENT MUST PROVIDE ALL Attributes, HAS to make sure to provide actual values on client when updating.
async updateCustomer(CustomerID : string, updatedCustomer:CustomerRequest){
    const updateCustomer = await this.docClient.update({
        TableName: this.customerTable,
        Key: { CustomerID: CustomerID },
        ExpressionAttributeNames: {"#N": "Name","#S":"SiteNumber", "#A":"Address", "#C":"City", "#P":"PostalCode", "#Pr":"Province", "#Ph":"Phone", "#CN":"ContactName" },
        UpdateExpression: 'set #N=:name, #S=:site, #A=:address, #C=:city, #P=:postal, #Pr=:province, #Ph=:phone, #CN =:contact',
        ExpressionAttributeValues:{
            ':name':updatedCustomer.Name,
            ':site' :updatedCustomer.SiteNumber,
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

async getCustomerbyID(CustomerID: string):Promise<CustomerItem[]>{
    const params ={
        TableName: this.customerTable,
        KeyConditionExpression: "CustomerID = :CustomerID",
        ExpressionAttributeValues: {":CustomerID": CustomerID}
    }
    const customer= await this.docClient.query(params).promise();
    const cust = customer.Items;
    return cust as CustomerItem[];
}

async customerExist(customerId: string) : Promise<Boolean>{
    const params = {
        ExpressionAttributeValues: {":id" :customerId},
        TableName: this.customerTable,
        KeyConditionExpression: "CustomerID = :id"
    };
    let exist: Boolean = false;
    const result = await this.docClient.query(params).promise();

    if (result.Count > 0){
        exist = true;
    }
    return exist;
  } 

async customerUrl(id:string, filename: string) : Promise<string>{
    const uploadUrl = this.S3.getSignedUrl("putObject", {
        Bucket: this.bucket,
        Key: filename,
        Expires: this.urlExp 
        });
    await this.docClient.update({
        TableName: this.customerTable,
        Key: {CustomerID: id},
        UpdateExpression: "set attachmentUrl= list_append(attachmentUrl, :URL",
        ExpressionAttributeValues: {
            ":URL": uploadUrl.split("?")[0]
        },
        ReturnValues: "UPDATED_NEW"
        }).promise();
    return uploadUrl;
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

function createS3Bucket(){
    return new AWS.S3({
        signatureVersion: "v4"
    });
}