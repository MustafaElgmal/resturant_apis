import { userType } from "./types";
import validator from "validator";
import { User } from "./entities/user";
import bcrypt from 'bcrypt'

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
        "password should be strong {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}!",
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
  return {message:''}
};

export const loginValidation=async(user:userType)=>{
const {email,password}=user
if (!email) {
    return { message: "Email is required!" };
  }
  const userFind= await User.findOneBy({ email });
  if (!userFind) {
    return { message: "Email is not vaild!" };
  }
  if (!password) {
    return { message: "Password is required!" };
  }
  const vaild=await bcrypt.compare(password,userFind.password)
  if(!vaild){
    return { message: "Password is not vaild!" };

  }
  return {message:''}

}
