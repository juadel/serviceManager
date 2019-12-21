import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ServiceItem } from "../models/service";
import { ServiceRequest } from "../requests/serviceRequest";
import { Service } from "../dataLogic/serviceLogic";
import { createCounter } from "../businessLogic/counter";
import { isActiveCounter } from "../businessLogic/counter"
import { increaseCounter} from "../businessLogic/counter"



const serviceItem= new Service();
//const counter = new Counter();



export async function createService( event: APIGatewayProxyEvent ): Promise<ServiceItem> {
    if (!isActiveCounter(process.env.ATOMIC_ID)){
        createCounter(process.env.ATOMIC_ID);
        increaseCounter(process.env.ATOMIC_ID);
    } else increaseCounter(process.env.ATOMIC_ID)

    //const serviceId: string = ticketIncrement();
    //counter.updatecount("102");
    const serviceId = uuid.v4();
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

// function ticketIncrement():string {
//   atomicCounter.increment( 'serviceTicket');
//   var ticket: string
//   atomicCounter.getLastValue( 'serviceTicket').done(function(lastValue){
//     ticket = lastValue;
//   }).fail(function(error){
//     ticket = "000A";
//   })
//     return ticket;
//}
