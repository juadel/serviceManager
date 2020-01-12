import * as AWS from "aws-sdk";
//import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ServiceItem } from "../models/service";
import { commentRequest } from "../requests/commentRequest";

//const XAWS = AWSXRay.captureAWS(AWS);

export class Service
{ constructor(
    private docClient: DocumentClient = createDynamoDBClient(),
    private S3 = createS3Bucket(),
    private serviceTable = process.env.SERVICE_TABLE,
    private bucket = process.env.BUCKET,
    //private urlExp = 300,
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
    
    const commenttoadd =await this.docClient.update({
            TableName: this.serviceTable,
            Key: {ServiceID: ServiceID},
            UpdateExpression: 'set Comments = list_append(Comments, :newComment)',
            ExpressionAttributeValues:{
                ':newComment':[comment],
            },
            ReturnValues: "UPDATED_NEW"
        }).promise();
        return commenttoadd;
    }
 
async serviceUrl(id: string, filename: string): Promise<string>{
    let params ={Bucket: this.bucket, Key: filename};
    const uploadUrl = this.S3.getSignedUrl("PutObject", params);
    
    await this.docClient.update({
        TableName: this.serviceTable,
        Key: {ServiceID: id},
        UpdateExpression: "set attachmentUrl=:URL",
        ExpressionAttributeValues: {
            ":URL": uploadUrl.split("?")[0]
        },
        ReturnValues: "UPDATED_NEW"
    }).promise();
    return uploadUrl;
  }

async serviceExist(ticketId: string): Promise<Boolean>{
    const params = {
        ExpressionAttributeValues: {':id':ticketId},
        TableName: this.serviceTable,
        KeyConditionExpression: 'ServiceID = :id'
    };
    let exist: Boolean = false;
    const result = await this.docClient.query(params).promise();

    if (result.Count > 0){
        exist = true;
    }
    return exist;
  } 

async getServicebyID(serviceId: string) : Promise<ServiceItem[]> {
    const params = {
        ExpressionAttributeValues: {':id': serviceId},
        TableName: this.serviceTable,
        KeyConditionExpression: 'ServiceID = :id'
     };
    const result = await this.docClient.query(params).promise();
    const service = result.Items;
    return service as ServiceItem[];
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
