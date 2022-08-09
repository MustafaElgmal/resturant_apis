import { Router } from "express";
import { User } from "../entities/user";
import { loginValidation, userValidation } from "../utils";
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
      email:email.toLowerCase(),
      password,
      type
    });
    await user.save()
    res.status(201).send({user})
  } catch (e) {
    res.status(500).send({ error: "Server error!" });
  }
});

router.post('/login',async(req,res)=>{
    const errors=await loginValidation(req.body)
    if(errors.message!==''){
        return res.status(400).send(errors)
    }
    try{
        const {email}=req.body
        const user=await User.findOne({where:{email:email.toLowerCase()}})
        res.send({user})
    }catch(e){
        res.status(500).send({error:'Server error!'})
    }

})
router.get('/',async(req,res)=>{
    try{
        const users=await User.find()
        res.send({users})

    }catch(e){
        res.status(500).send({error:'Server error!'})
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
        res.status(500).send({error:'Server error!'})
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
        res.status(500).send({error:'Server error!'})
    }

})


export default router;
