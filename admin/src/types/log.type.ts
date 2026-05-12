export interface LogT {
    _id: Id
    action: string
    productId: number
    userId: number
    payload: Payload
    timestamp: Timestamp
    __v: number
  }
  
  export interface Id {
    $oid: string
  }
  
  export interface Payload {
    name: string
    description: string
    price: number
    stock: number
    categoryId: number
    imageUrl: string
  }
  
  export interface Timestamp {
    $date: string
  }
  