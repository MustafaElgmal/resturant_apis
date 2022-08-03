
export interface userType{
    firstName:string
    lastName:string
    email:string
    password:string
    type:string
}

export interface categoryType{
    name:string
}

export interface itemType{
    name:string,
    description:string,
    price:number,
    popular:boolean
}
export interface orderItemType{
    itemId:number,Qty:number
}

export interface orderType{
    userId:number,
    mobile:string,
    city:string,
    address:string
    items:orderItemType[]
}

