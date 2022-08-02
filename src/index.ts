const express=require('express')
import { config } from "dotenv"
import cors from 'cors'
import morgan from "morgan"
import helmet from "helmet"
import { json, urlencoded } from "express"
import { connectionDB } from "./dp/conection"
import userRouter from './routers/user'
import categoryRouter from './routers/category'
import itemRouter from './routers/item'
import orderRouter from './routers/order'


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


const port=process.env.PORT||5000
app.listen(port,()=>{
    connectionDB()
    console.log(`Server is running on port: ${port}`)
})