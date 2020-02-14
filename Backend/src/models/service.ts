export interface ServiceItem {
    ServiceID: string
    CustomerID: string
    createdAt: string
    Title: string
    Description: string
    dueDate: string
    PriorityLevel: string,
    Status: string
    Comments: Array<string>
    attachmentUrl: Array<string>
    CreatedBy: string
  }
  