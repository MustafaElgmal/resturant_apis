import { OrderItem } from './entities/orderItem';
import { User } from './entities/user';
import { Request } from "express";

export interface RequestAuthType extends Request{
    user?:User
}

export interface userCreate{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;

}

export interface itemCreate{
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    popular: boolean;
}

export interface orderItemCreate{
    Qty:number,
    itemId:number
    
}

export interface orderCreate{
    mobile: string;
    city: string;
    address: string;
    orderItems:orderItemCreate[]
  
}

