import {Router} from 'express'
import { Category } from '../entities/category'
import { categoryValidation } from '../functions'

const router=Router()

router.post('/',async(req,res)=>{
    const errors=await categoryValidation(req.body)
    if(errors.message!==''){
        return res.status(400).send(errors)
    }
    try{
        const {name}=req.body
        const cate=Category.create({
            name
        })
        await cate.save()
        res.status(201).send({category:cate})

    }catch(e){
        console.log(e)
        res.status(500).send({error:'Server is down!'})
    }
})

router.get('/',async(req,res)=>{
    try{
        const categories=await Category.find()
        res.send({categories})
    }catch(e){
        res.status(500).send({error:'Server is down!'})
    }
})


export default router