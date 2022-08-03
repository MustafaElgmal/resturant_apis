import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  type: string;
  @Column({nullable:true})
  imgUrl: string;
  @Column({ nullable: true })
  dateOfBirth: Date;
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
