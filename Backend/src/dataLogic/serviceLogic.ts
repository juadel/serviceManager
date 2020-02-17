import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ServiceItem } from "../models/service";





export class Service
{ constructor(
    private docClient: DocumentClient = createDynamoDBClient(),
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
    
async addComment(ServiceID: string , comment: string){
    
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
 
async serviceUrl(ServiceID:string, description: string, filename: string): Promise<string>{
    const params ={Bucket: this.bucket, Key: filename, Expires: 60};
    const S3 = new AWS.S3({signatureVersion: 'v4'});
    const signedURL = S3.getSignedUrl('putObject', params);
      
    await this.docClient.update({
        TableName: this.serviceTable,
        Key: {ServiceID: ServiceID},
        UpdateExpression: "set attachmentUrl= list_append(attachmentUrl, :URL), fileDescription = list_append(fileDescription, :fileDesc)" ,
        ExpressionAttributeValues: {
            ":URL": [signedURL.split("?")[0]],
            ":fileDesc" : [description]
        },
        ReturnValues: "UPDATED_NEW"
    }).promise();
       return signedURL;
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
