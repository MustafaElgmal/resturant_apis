import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Item } from "./item";
import { Order } from "./order";


@Entity()
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    quantity:number
    @CreateDateColumn({type:'timestamptz'})
    createdAt:Date
    @UpdateDateColumn({type:'timestamptz',onUpdate:'CURRENT_TIMESTAMPTZ(6)'})
    updatedAt:Date

    @ManyToOne(()=>Order,(order)=>order.orderItems,{nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
    order:Order

    @ManyToOne(()=>Item,(item)=>item.orderItems)
    item:Item
}