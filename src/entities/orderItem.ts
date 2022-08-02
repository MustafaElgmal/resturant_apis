import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Item } from "./item";
import { Order } from "./order";


@Entity()
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    Qty:number
    @ManyToOne(()=>Order,(order)=>order.orderItems,{nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
    order:Order

    @ManyToOne(()=>Item,(item)=>item.orderItems)
    item:Item
}