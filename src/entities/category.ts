import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item";


@Entity()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique:true})
    name:string

    @OneToMany(()=>Item,(item)=>item.category)
    items:Item[]
}