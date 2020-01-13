export interface ServiceItem {
    ServiceID: string
    CustomerID: string
    createdAt: string
    Title: string
    Description: string
    dueDate: string
    Status: boolean
    Comments: Array<string>
    attachmentUrl: Array<string>
  }
  