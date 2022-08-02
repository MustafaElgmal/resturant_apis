import { createConnection } from "typeorm"
import { Category } from "../entities/category"
import { Item } from "../entities/item"
import { Order } from "../entities/order"
import { OrderItem } from "../entities/orderItem"
import { User } from "../entities/user"

export const connectionDB=async()=>{
    try{
        await createConnection({
            type: "postgres",
            host: process.env.PGHOST,
            port: +process.env.PGPORT!,
            username: process.env.PGUSER,
            password:process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            synchronize:true,
            logging:false,
            entities:[User,Category,Item,Order,OrderItem],
            migrations:["migration/*.ts"],
            subscribers:[]
        })

    }catch(e){
        console.log(`DB connection not vaild!`)
    }
}