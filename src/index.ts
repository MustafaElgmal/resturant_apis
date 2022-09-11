const express=require('express')
import { config } from "dotenv"
import cors from 'cors'
import morgan from "morgan"
import helmet from "helmet"
import { json, urlencoded } from "express"
import { connectionDB } from "./db/connection"
import userRouter from './routes/user'
import categoryRouter from './routes/category'
import itemRouter from './routes/item'
import orderRouter from './routes/order'
import { Request,Response } from "express"

const app=express()
config()
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(json())
app.use(urlencoded({extended:true}))
app.use('/users',userRouter)
app.use('/categories',categoryRouter)
app.use('/items',itemRouter)
app.use('/orders',orderRouter)

app.use('*',async(req:Request,res:Response)=>{
    res.send({error:'Api not found'})
})
const port=process.env.PORT||5000
app.listen(port,()=>{
    connectionDB()
    console.log(`Server is running on port: ${port}`)
})