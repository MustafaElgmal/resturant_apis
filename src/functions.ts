import {itemType, orderItemType, orderType, userType } from "./types";
import validator from "validator";
import { User } from "./entities/user";
import bcrypt from "bcrypt";
import { Category } from "./entities/category";
import { Item } from "./entities/item";
import {OrderItem} from './entities/orderItem'

export const userValidation = async (user: userType) => {
  const { firstName, lastName, email, password, type } = user;
  if (!firstName) {
    return { message: "FirstName is required!" };
  }
  if (!lastName) {
    return { message: "LastName is required!" };
  }
  if (!email) {
    return { message: "Email is required!" };
  }
  if (!validator.isEmail(email)) {
    return { message: "Email is not vaild!" };
  }
  const userFind = await User.findOneBy({ email });
  if (userFind) {
    return { message: "Email is already exists!" };
  }
  if (!password) {
    return { message: "Password is required!" };
  }
  if (!validator.isStrongPassword(password)) {
    return {
      message:
        "password should be strong {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}",
    };
  }
  if (!type) {
    return { message: "Type is required!" };
  }
  if (
    type.toLocaleLowerCase() !== "admin" &&
    type.toLocaleLowerCase() !== "user" &&
    type.toLocaleLowerCase() !== "employee"
  ) {
    return { message: "Type should be admin or user or employee!" };
  }
  return { message: "" };
};

export const loginValidation = async (user: userType) => {
  const { email, password } = user;
  if (!email) {
    return { message: "Email is required!" };
  }
  const userFind = await User.findOneBy({ email });
  if (!userFind) {
    return { message: "Email is not vaild!" };
  }
  if (!password) {
    return { message: "Password is required!" };
  }
  const vaild = await bcrypt.compare(password, userFind.password);
  if (!vaild) {
    return { message: "Password is not vaild!" };
  }
  return { message: "" };
};

export const categoryValidation = async (cate: { name: string }) => {
  const { name } = cate;
  if (!name) {
    return { message: "CategoryName is required!" };
  }
  const category = await Category.findOneBy({ name });
  if (category) {
    return { message: "CategoryName is already exists!" };
  }
  return { message: "" };
};

export const itemValidation = async (item:itemType) => {
  const { name, description, price, popular } = item;
  if (!name) {
    return { message: "ItemName is required!" };
  }
  if (!description) {
    return { message: "Description is required!" };
  }
  if (!price) {
    return { message: "Price is required!" };
  }
  if (popular===undefined) {
    return { message: "Popular is required!" };
  }
  if (popular !== true && popular !== false) {
    return { message: "Popular should be bool!" };
  }
  return { message: "" };
};
export const orderVaildation=async(order:orderType)=>{
  const {userId,mobile,city,address,items}=order
  if(!userId){
    return {message:'UserId is required!'}
  }
  if(!mobile){
    return {message:'mobile is required!'}
  }
  if(!city){
    return {message:'city is required!'}
  }
  if(!address){
    return {message:'address is required!'}
  }
  if(items.length===0){
    return {message:'Items is required!'}
  }
  return {message:''}

}

export const createOrderItems=async(items:orderItemType[],order:any)=>{

  items.forEach(async (item: orderItemType) => {
    const itemFind = await Item.findOne({ where: { id: item.itemId } });
    if (!itemFind) {
      return {messgae:'Item not found!'}
    }
    const orderItem = OrderItem.create({
      Qty: item.Qty,
      order,
      item: itemFind,
    });
    await orderItem.save();
  });
  return {message:''}

}
