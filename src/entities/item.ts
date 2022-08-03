import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { OrderItem } from "./orderItem";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({
    default:
      "https://review2020.s3.amazonaws.com/Tawwr/%E2%80%94Pngtree%E2%80%94seafood+pizza+with+cheese_4942142.png"
  })
  imgUrl: string;

  @Column()
  popular: boolean;

  @ManyToOne(() => Category, (category) => category.items, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItems: OrderItem[];
}
