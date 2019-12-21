
import { Counter } from "../dataLogic/AtomicCounterLogic"
import { counterItem } from "../models/counter"

const counter = new Counter();

export async function createCounter(companyName: string): Promise<counterItem>{
    
    const ticket = 0 ;
    const createdCounter= await counter.createCounter(
        { 
            companyName: companyName,
            ticket: ticket
        }

    );
    return createdCounter;
    
}
export async function increaseCounter(companyName: string){
    
    const newCount = await counter.updatecount(companyName);
    return newCount

}

export async function isActiveCounter(companyName: string){
    const exists = await counter.isActiveCounter(companyName)
    return exists
}