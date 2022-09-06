import { userCreate, RequestAuthType } from './../types';
import { generateAuth } from './../utils/functions';
import { Router } from "express";
import { User } from "../entities/user";
import { loginValidation, userValidation } from "../utils/validations";
import bcrypt from 'bcrypt'
import { auth } from '../middlewares/auth';

const router = Router();

router.post("/", async (req, res) => {
  const error = await userValidation(req.body);
  if (error.message !== "") {
    return res.status(400).json(error);
  }
  try {
    let { firstName, lastName, email, password, type }:userCreate = req.body;
    password=await bcrypt.hash(password,8)
    const user = User.create({
      firstName,
      lastName,
      email:email.toLowerCase(),
      password,
      type
    });
    await user.save()
    const token=generateAuth(user.email)
    res.status(201).json({token,type:user.type})
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

router.post('/signin',async(req,res)=>{
    const error=await loginValidation(req.body)
    if(error.message!==''){
        return res.status(400).json(error)
    }
    try{
        const {email}:{email:string}=req.body
        const user=await User.findOne({where:{email}})
        const token=generateAuth(email)
        res.status(200).json({token,type:user?.type})
    }catch(e){
        res.status(500).json({error:'Server error!'})
    }
})

router.get('/',auth,async(req:RequestAuthType,res)=>{
    if (req.user?.type !== "admin") {
        return res
          .status(400)
          .json({ messgae: "you should be admin get users!" });
      }
    try{
        const users=await User.find()
        res.json({users})

    }catch(e){
        res.status(500).json({error:'Server error!'})
    }
})

router.get('/profile',auth,async(req:RequestAuthType,res)=>{
    const user=req.user!
    res.json({user})
})


export default router;
