import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./orderItem";
import { User } from "./user";


@Entity()
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    firstName:string
    @Column()
    lastName:string
    @Column()
    mobile:string
    @Column()
    city:string
    @Column()
    address:string
    @CreateDateColumn({type:'timestamptz'})
    createdAt:Date
    @UpdateDateColumn({type:'timestamptz',onUpdate:'CURRENT_TIMESTAMPTZ(6)'})
    updatedAt:Date

    @ManyToOne(()=>User,(user)=>user.orders,{nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
    user:User

    @OneToMany(()=>OrderItem,(orderItem)=>orderItem.order)
    orderItems:OrderItem[]

}