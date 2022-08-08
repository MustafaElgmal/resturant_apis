
export interface userType{
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    imgUrl?: string;
    dateOfBirth?: Date;
}

export interface categoryType{
    id?:number,
    name:string
}

export interface itemType{
    id?: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  popular: boolean;
  category: categoryType;
}
export interface orderItemType{
    id?:number,
    Qty:number,
    item:itemType
    
}

export interface orderType{
    id?: number;
    mobile: string;
    city: string;
    address: string;
    user: userType;
    orderItems:orderItemType[]
    isCompleted?: boolean;
    orderNo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

