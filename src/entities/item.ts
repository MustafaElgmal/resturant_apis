import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { OrderItem } from "./orderItem";


@Entity()
export class Item extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    categoryId:number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    price:number
    
    @Column()
    imgUrl:string

    @Column()
    popular:boolean

    @ManyToOne(()=>Category,(category)=>category.items,{nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
    category:Category

    @OneToMany(()=>OrderItem,(orderItem)=>orderItem.item)
    orderItems:OrderItem[]


}