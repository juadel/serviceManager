export interface ServiceItem {
    ServiceID: string
    CustomerID: string
    createdAt: string
    Title: string
    Description: string
    dueDate: string
    PriorityLevel: string
    SStatus: string
    Comments: Array<string>
    attachmentUrl: Array<string>
    fileDescription: Array<string>
    CreatedBy: string
  }
  