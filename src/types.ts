
export interface userType{
    id:number
    firstName:string
    lastName:string
    email:string
    password:string
    type:string
    imgUrl:string
    dateOfBirth:Date

}

export interface categoryType{
    id:number,
    name:string,
    items:itemType[]

}

export interface itemType{
    id:number,
    categoryId:number,
    name:string,
    description:string,
    price:number,
    imgUrl:string,
    popular:boolean
    category:categoryType
}
export interface orderItemType{
    itemId:number,Qty:number
}

export interface orderType{
    userId:number,
    orderPhone:string,
    orderCity:string,
    orderAddress:string
    items:orderItemType[]
}

