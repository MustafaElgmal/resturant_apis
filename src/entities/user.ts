import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    firstName:string
    @Column()
    lastName:string
    @Column()
    email:string
    @Column()
    password:string
    @Column()
    type:string
    @Column({nullable:true})
    imgUrl:string
    @Column({nullable:true})
    dateOfBirth:Date

}