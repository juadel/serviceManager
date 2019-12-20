import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ServiceItem } from "../models/service"
import { ServiceRequest } from "../requests/serviceRequest"
import { Service } from "../dataLogic/serviceLogic"

const serviceItem= new Service();

export async function createService( event: APIGatewayProxyEvent ): Promise<ServiceItem> {
    const serviceId = uuid.v4();
    //const userId = getUserId(event);
    const newService: ServiceRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const createdService = await serviceItem.createService(
      { 
        //userId: userId,
        ServiceID: serviceId,
        createdAt: new Date().toISOString(),
        Status: false,
        ...newService
      }
    );
  return createdService;
}