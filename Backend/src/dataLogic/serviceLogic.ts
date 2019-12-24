
import { DocumentClient } from "aws-sdk/clients/dynamodb";
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));


import { ServiceItem } from "../models/service"
import { commentRequest } from "../requests/commentRequest";
//import { } from 

export class Service
{ constructor(
    private docClient: DocumentClient = createDynamoDBClient(),
    //private S3 = createS3Bucket(),
    private serviceTable = process.env.SERVICE_TABLE,
    //private bucket = 
    //private urlExp = 
    //private index = process.env.SUB_INDEX
){}

async createService(service: ServiceItem ) : Promise<ServiceItem>{
    await this.docClient.put({
        TableName: this.serviceTable,
        Item: service
    }).promise();
    return service
    }
    
async addComment(ServiceID: string , comment: commentRequest){
    const CustomerID = "30";
    const commenttoadd =await this.docClient.update({
            TableName: this.serviceTable,
            Key: { ServiceID, CustomerID },
            UpdateExpression: 'set Comments = list_append(Comments, :newComment)',
            ExpressionAttributeValues:{
                ':newComment':[comment],
            },
            ReturnValues: "UPDATED_NEW"
        }).promise();
        return commenttoadd;
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

