import { Router } from "express";
import { User } from "../entities/user";
import { loginValidation, userValidation } from "../functions";
import bcrypt from 'bcrypt'

const router = Router();

router.post("/", async (req, res) => {
  const errors = await userValidation(req.body);
  if (errors.message !== "") {
    return res.status(400).send(errors);
  }
  try {
    let { firstName, lastName, email, password, type } = req.body;
    password=await bcrypt.hash(password,8)
    const user = User.create({
      firstName,
      lastName,
      email,
      password,
      type
    });
    await user.save()
    res.status(201).send({user})
  } catch (e) {
    res.status(500).send({ error: "Server is dwon!" });
  }
});

router.post('/login',async(req,res)=>{
    const errors=await loginValidation(req.body)
    if(errors.message!==''){
        return res.status(400).send(errors)
    }
    try{
        const user=await User.findOneBy({email:req.body.email})
        res.send({user})
    }catch(e){
        res.status(500).send({error:'Server is down!'})
    }

})

router.get('/:id',async(req,res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).send({message:'UserId is required as paramter!'})
    }
    try{
        const user=await User.findOneBy({id:+id})
        if(!user){
            return res.status(404).send({message:'User is not found!'})
            
        }
        res.send({user})

    }catch(e){
        res.status(500).send({error:'Server is down!'})
    }

})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).send({message:'UserId is required as paramter!'})
    }
    try{
        const user=await User.findOneBy({id:+id})
        if(!user){
            return res.status(404).send({message:'User is not found!'})
            
        }
        await User.delete({id:+id})
        res.send({message:'User is deleted'})

    }catch(e){
        res.status(500).send({error:'Server is down!'})
    }

})

export default router;
