import { User } from './../entities/user';
import { NextFunction, Response } from 'express';
import { RequestAuthType } from './../types';
import jwt from 'jsonwebtoken'

export const auth=async(req:RequestAuthType,res:Response,next:NextFunction)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({ error: "Please Authenticate!" });
    }
    try{
        const {email}=jwt.verify(authorization!,process.env.SECRETKEY!) as {email:string}
        const user=await User.findOne({where:{email}})
        if(!user){
            return res.status(401).json({ error: "Please vaild Authenticate!" });
        }
        req.user=user
        next()

    }catch(e){
        res.status(401).json({ error: "Please vaild Authenticate!" });
    }

}